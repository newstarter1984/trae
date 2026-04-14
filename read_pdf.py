#!/usr/bin/env python3
import sys
try:
    from pypdf import PdfReader
except ImportError:
    try:
        from PyPDF2 import PdfReader
    except ImportError:
        print("需要安装pypdf或PyPDF2库")
        sys.exit(1)

pdf_path = "二年级语文下册课堂笔记（无水印）.pdf"

try:
    reader = PdfReader(pdf_path)
    print(f"PDF总页数: {len(reader.pages)}")
    print("=" * 80)
    
    full_text = ""
    for i, page in enumerate(reader.pages):
        try:
            text = page.extract_text()
            if text:
                full_text += text + "\n"
                print(f"第{i+1}页:")
                print(text[:500])
                print("...\n")
        except Exception as e:
            print(f"第{i+1}页读取失败: {e}")
    
    print("=" * 80)
    print("完整内容已保存到output.txt")
    
    with open("output.txt", "w", encoding="utf-8") as f:
        f.write(full_text)
        
except Exception as e:
    print(f"错误: {e}")
