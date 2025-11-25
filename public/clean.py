import re
import json

def clean_json_file(input_path, output_path):
    # Step 1: read raw bytes and decode safely
    with open(input_path, 'rb') as f:
        raw_data = f.read()
    clean_str = raw_data.decode('utf-8', errors='ignore')

    # Step 2: try to fix property names that are not double-quoted
    # This regex will match property names without quotes: key: value
    clean_str = re.sub(r'(\b[a-zA-Z_][a-zA-Z0-9_]*\b)\s*:', r'"\1":', clean_str)

    try:
        data = json.loads(clean_str)
    except json.JSONDecodeError as e:
        print(f"JSON still invalid: {e}")
        return

    # Step 3: write cleaned JSON
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Cleaned JSON saved to {output_path}")

if __name__ == "__main__":
    clean_json_file("input.json", "output.json")
