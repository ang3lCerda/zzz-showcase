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
    char_level=  level*10
    base_hp =  stats.get("Attack", 0)
    hp_growth = stats.get("AttackGrowth", 0)
    hp_growth=  hp_growth/10000
    inner_part=  hp_growth*(char_level-1)
    if level==6:
        level=5
    level_bonus= data["Level"][str(level+1)]["Attack"]
    total_hp = base_hp+ inner_part+level_bonus
    return total_hp
   

max_level = 6

print("\nHP Growth by Level:")
for lvl in range(1, max_level + 1):
    hp = calc_hp(lvl, stats, lol)
    char_lvl=lvl*10
    print(f"Level {lvl}: HP = {hp} Char= {char_lvl} ")


with open("character-stats.json", "w", encoding="utf-8") as f:
    json.dump(stats, f, indent=2, ensure_ascii=False)
