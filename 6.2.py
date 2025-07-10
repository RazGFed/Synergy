x = int(input('Введите натуральное число: '))
count = 0
if x <= 2e9:
    for i in range (1, x+1):
        if x % i == 0:
            count += 1
print('Количество натуральных делителей:', count)