import json

# Load the JSON file
with open("character.json", "r", encoding="utf-8") as f:
    lol = json.load(f)

# Extract the stats field
stats = lol.get("Stats", {})

# Print the raw stats
print("Raw Stats:")
for key, value in stats.items():
    print(f"{key}: {value}")

# Function to calculate HP growth
def calc_hp(level: int, stats: dict,data:dict) -> int:
    base_hp = stats.get("HpMax", 0)
    hp_growth = stats.get("HpGrowth", 0)
    level_bonus= data["Level"][str(level)]["HpMax"]
    print(level_bonus)

    total_hp = base_hp + (level * hp_growth/1000) + level_bonus

    return total_hp

max_level = 6

print("\nHP Growth by Level:")
for lvl in range(1, max_level + 1):
    hp = calc_hp(lvl, stats, lol)
    print(f"Level {lvl}: HP = {hp}")


with open("character-stats.json", "w", encoding="utf-8") as f:
    json.dump(stats, f, indent=2, ensure_ascii=False)
