n = int(input('Введите количество чисел: '))
count = 0
for i in range(n):
    a = int(input('Введите число: '))
    if a == 0:
        count +=1
print('Количество нулей:', count)