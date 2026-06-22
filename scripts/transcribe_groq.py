#!/usr/bin/env python3
import os
import sys
import argparse
import subprocess
import requests

# Kredensial Akses Gateway & Lisensi
API_URL = "https://api.intisariapps.com/v1/audio/transcriptions"
GATEWAY_TOKEN = "16ce46d745f077bc89b2671789504582f5edfa566743f5a062312b2829e4f1d1"
LICENSE_KEY = os.getenv("LICENSE_KEY", "LEAD-BDOGZ7")
HWID = os.getenv("HWID", "INTI-HW-DD7313")

# Batas ukuran file Groq Whisper (25MB)
MAX_FILE_SIZE_MB = 25
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

def check_ffmpeg():
    """Memeriksa apakah ffmpeg terinstal di sistem."""
    try:
        subprocess.run(["ffmpeg", "-version"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return True
    except FileNotFoundError:
        return False

def extract_audio(video_path, output_audio_path):
    """Mengekstrak audio dari file video menggunakan ffmpeg."""
    print(f"[INFO] Mengekstrak audio dari: {video_path}...")
    try:
        # Mengonversi video ke MP3 dengan bitrate 128k untuk menghemat ukuran file
        cmd = [
            "ffmpeg", "-y",
            "-i", video_path,
            "-vn",
            "-acodec", "libmp3lame",
            "-ab", "128k",
            "-ar", "44100",
            output_audio_path
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print("[SUCCESS] Berhasil mengekstrak audio.")
        return True
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] Gagal mengekstrak audio menggunakan ffmpeg: {e}")
        return False

def transcribe_audio(audio_path, language="id"):
    """Mengirimkan file audio ke API Gateway untuk ditranskripsi."""
    print("[INFO] Mengirimkan file ke API Gateway Groq Whisper...")
    
    headers = {
        "X-License-Key": LICENSE_KEY,
        "X-HWID": HWID,
        "Authorization": f"Bearer {GATEWAY_TOKEN}"
    }

    # Menggunakan model default Groq Whisper: whisper-large-v3
    filename = os.path.basename(audio_path)
    
    # Deteksi content type sederhana
    content_type = "audio/mpeg"
    if filename.endswith(".m4a"):
        content_type = "audio/mp4"
    elif filename.endswith(".wav"):
        content_type = "audio/wav"
    elif filename.endswith(".mp4"):
        content_type = "video/mp4"

    try:
        with open(audio_path, "rb") as f:
            files = {
                "file": (filename, f, content_type),
                "model": (None, "whisper-large-v3"),
                "language": (None, language),
                "response_format": (None, "verbose_json")
            }
            
            response = requests.post(API_URL, headers=headers, files=files)
            
        if response.status_code == 200:
            result = response.json()
            if "segments" in result:
                formatted_segments = []
                for seg in result["segments"]:
                    start = seg["start"]
                    end = seg["end"]
                    start_min, start_sec = divmod(int(start), 60)
                    end_min, end_sec = divmod(int(end), 60)
                    timestamp = f"[{start_min:02d}:{start_sec:02d} -> {end_min:02d}:{end_sec:02d}]"
                    formatted_segments.append(f"{timestamp} {seg['text']}")
                return "\n".join(formatted_segments)
            return result.get("text", "")
        else:
            print(f"[ERROR] Gagal Transkripsi (HTTP {response.status_code}): {response.text}")
            return None
            
    except Exception as e:
        print(f"[ERROR] Terjadi kesalahan saat menghubungi API: {e}")
        return None

def main():
    parser = argparse.ArgumentParser(description="Transkrip video MP4 atau file audio menggunakan Groq Whisper via API Gateway.")
    parser.add_argument("input", help="Path ke file video (MP4) atau audio (MP3/M4A/WAV) yang ingin ditranskripsi.")
    parser.add_argument("-l", "--lang", default="id", help="Kode bahasa transkripsi (default: 'id' untuk Bahasa Indonesia).")
    parser.add_argument("-o", "--output", help="Path ke file .txt output untuk menyimpan hasil transkripsi.")
    
    args = parser.parse_args()
    
    input_path = args.input
    
    if not os.path.exists(input_path):
        print(f"[ERROR] File '{input_path}' tidak ditemukan.")
        sys.exit(1)
        
    file_size = os.path.getsize(input_path)
    is_video = input_path.lower().endswith(".mp4")
    
    temp_audio_path = None
    transcribe_target = input_path
    
    # Jika file berupa MP4, kita coba ekstrak audionya terlebih dahulu untuk menghemat bandwidth & menghindari limit 25MB
    if is_video or file_size > MAX_FILE_SIZE_BYTES:
        if check_ffmpeg():
            temp_audio_path = os.path.splitext(input_path)[0] + "_temp.mp3"
            if extract_audio(input_path, temp_audio_path):
                transcribe_target = temp_audio_path
                new_size = os.path.getsize(temp_audio_path)
                print(f"[INFO] Ukuran file setelah dikonversi: {new_size / (1024*1024):.2f} MB")
            else:
                print("[WARNING] Gagal mengekstrak audio. Mencoba mengirimkan file asli...")
        else:
            print("[WARNING] ffmpeg tidak ditemukan di sistem. Anda perlu menginstal ffmpeg agar dapat mengekstrak audio dari video secara lokal.")
            if file_size > MAX_FILE_SIZE_BYTES:
                print(f"[ERROR] File '{input_path}' berukuran {file_size / (1024*1024):.2f} MB (Melebihi batas maksimal {MAX_FILE_SIZE_MB} MB).")
                sys.exit(1)

    # Lakukan transkripsi
    text = transcribe_audio(transcribe_target, args.lang)
    
    # Bersihkan file temporer jika ada
    if temp_audio_path and os.path.exists(temp_audio_path):
        try:
            os.remove(temp_audio_path)
        except OSError:
            pass
            
    if text:
        print("\n--- HASIL TRANSKRIPSI ---\n")
        print(text)
        print("\n-------------------------\n")
        
        # Simpan jika ada argumen output
        if args.output:
            try:
                with open(args.output, "w", encoding="utf-8") as out_file:
                    out_file.write(text)
                print(f"[SUCCESS] Hasil transkripsi disimpan ke: {args.output}")
            except Exception as e:
                print(f"[ERROR] Gagal menyimpan ke file output: {e}")
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()
