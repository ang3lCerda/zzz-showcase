base_atk = 48
rates = [1568, 3136, 4705, 6273, 7841, 39204, 73704, 94090,15682,17250]
atk_observed = [55, 63, 70, 78, 85, 321, 573, 713,115]
star_rates = [0, 8922, 17844, 26766, 35688, 44610]
levels = [1, 2, 3, 4, 5, 25, 47, 60,10,11]

def calc_base_atk(level, rate, base_atk, star_rates):

    star_index = level // 10
    if star_index >= len(star_rates):
        star_index = len(star_rates) - 1
    star_rate = star_rates[star_index]

    return base_atk * (1 + rate/10000 + star_rate/10000)


print(f"{'Lvl':<5}{'Rate':<8}{'Calc ATK':<15}{'Observed ATK':<15}{'StarIdx':<8}")
for lvl, rate, atk in zip(levels, rates, atk_observed):
    star_idx = lvl // 10 if lvl // 10 < len(star_rates) else len(star_rates) - 1
    predicted = calc_base_atk(lvl, rate, base_atk, star_rates)
    print(f"{lvl:<5}{rate:<8}{predicted:<15.2f}{atk:<15}{star_idx:<8}")
