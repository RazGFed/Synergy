const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

function isValidDate(day, month, year) {
    if (
        !Number.isInteger(day) ||
        !Number.isInteger(month) ||
        !Number.isInteger(year)
    ) {
        return false;
    }

    if (year < 1 || month < 1 || month > 12 || day < 1) {
        return false;
    }

    const date = new Date(year, month - 1, day);

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}

function getDayOfWeek(day, month, year) {
    const date = new Date(year, month - 1, day);

    const daysOfWeek = [
        "воскресенье",
        "понедельник",
        "вторник",
        "среда",
        "четверг",
        "пятница",
        "суббота"
    ];

    return daysOfWeek[date.getDay()];
}

function isLeapYear(year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

function calculateAge(day, month, year) {
    const today = new Date();

    let age = today.getFullYear() - year;

    const birthdayThisYear = new Date(
        today.getFullYear(),
        month - 1,
        day
    );

    if (today < birthdayThisYear) {
        age--;
    }

    return age;
}

const digits = {
    "0": [
        " *** ",
        "*   *",
        "*   *",
        "*   *",
        "*   *",
        "*   *",
        " *** "
    ],

    "1": [
        "  *  ",
        " **  ",
        "* *  ",
        "  *  ",
        "  *  ",
        "  *  ",
        "*****"
    ],

    "2": [
        " *** ",
        "*   *",
        "    *",
        "   * ",
        "  *  ",
        " *   ",
        "*****"
    ],

    "3": [
        " *** ",
        "*   *",
        "    *",
        " *** ",
        "    *",
        "*   *",
        " *** "
    ],

    "4": [
        "*   *",
        "*   *",
        "*   *",
        "*****",
        "    *",
        "    *",
        "    *"
    ],

    "5": [
        "*****",
        "*    ",
        "*    ",
        "**** ",
        "    *",
        "*   *",
        " *** "
    ],

    "6": [
        " *** ",
        "*   *",
        "*    ",
        "**** ",
        "*   *",
        "*   *",
        " *** "
    ],

    "7": [
        "*****",
        "    *",
        "   * ",
        "  *  ",
        " *   ",
        "*    ",
        "*    "
    ],

    "8": [
        " *** ",
        "*   *",
        "*   *",
        " *** ",
        "*   *",
        "*   *",
        " *** "
    ],

    "9": [
        " *** ",
        "*   *",
        "*   *",
        " ****",
        "    *",
        "*   *",
        " *** "
    ]
};

function printNumber(number) {
    const numberString = String(number);

    for (let row = 0; row < 7; row++) {
        let line = "";

        for (const digit of numberString) {
            line += digits[digit][row] + "  ";
        }

        console.log(line);
    }
}

async function main() {
    console.log("========================================");
    console.log("       ПРОГРАММА О ДАТЕ РОЖДЕНИЯ");
    console.log("========================================");

    const day = Number(await ask("Введите день рождения: "));
    const month = Number(await ask("Введите месяц рождения: "));
    const year = Number(await ask("Введите год рождения: "));

    if (!isValidDate(day, month, year)) {
        console.log("\nОшибка: введена некорректная дата.");
        rl.close();
        return;
    }

    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");
    const formattedYear = String(year).padStart(4, "0");

    const formattedDate =
        `${formattedDay} ${formattedMonth} ${formattedYear}`;

    const dayOfWeek = getDayOfWeek(day, month, year);
    const leapYear = isLeapYear(year);
    const age = calculateAge(day, month, year);

    console.log("\n========================================");
    console.log("              РЕЗУЛЬТАТ");
    console.log("========================================");

    console.log(`Дата рождения: ${formattedDate}`);
    console.log(`День недели: ${dayOfWeek}`);
    console.log(
        `Год ${year} ${
            leapYear ? "является високосным" : "не является високосным"
        }.`
    );
    console.log(`Возраст: ${age} лет`);

    console.log("\n========================================");
    console.log("       ДАТА НА ЭЛЕКТРОННОМ ТАБЛО");
    console.log("========================================");

    printNumber(formattedDate.replaceAll(" ", ""));

    console.log("========================================");

    rl.close();
}
main();