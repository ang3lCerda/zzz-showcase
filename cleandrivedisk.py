def keep_english_and_convert_icons(data: dict) -> dict:
    """Keep only EN + convert icon path to hakush.in URL."""
    cleaned = {}
    base_url = "https://api.hakush.in/zzz/UI/"

    for item_id, item_data in data.items():
        old_icon = item_data.get("icon", "")

        # Extract the filename from the old path
        # e.g. "SuitShiningAria.png" → "SuitShiningAria"
        filename = old_icon.split("/")[-1].split(".")[0]

        # Create new URL with .webp
        new_icon = f"{base_url}{filename}.webp"

        cleaned[item_id] = {
            "icon": new_icon,
            "EN": item_data.get("EN", {})
        }

    return cleaned


import json

with open("disk-sets.json", "r", encoding="utf-8") as f:
    suits = json.load(f)

cleaned = keep_english_and_convert_icons(suits)

with open("disk-sets-english.json", "w", encoding="utf-8") as f:
    json.dump(cleaned, f, indent=2, ensure_ascii=False)

