a = int(input('Введите целое число A: '))
b = int(input('Введите целое число B: '))
for i in range(a, b+1):
    if i % 2 == 0:
        print(i, end=' ')
