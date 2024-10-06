const czechNames = [
    {
        "gender": "female",
        "name": "Jiřina",
        "surname": "Ptáčková"
    },
    {
        "gender": "male",
        "name": "Jan",
        "surname": "Novák"
    },
    {
        "gender": "female",
        "name": "Lenka",
        "surname": "Malá"
    },
    {
        "gender": "female",
        "name": "Lucie",
        "surname": "Děsivá"
    },
    {
        "gender": "male",
        "name": "Petr",
        "surname": "Svoboda"
    },
    {
        "gender": "male",
        "name": "Jakub",
        "surname": "Tesař"
    },
    {
        "gender": "female",
        "name": "Eva",
        "surname": "Králová"
    },
    {
        "gender": "male",
        "name": "Tomáš",
        "surname": "Dvořák"
    },
    {
        "gender": "female",
        "name": "Marie",
        "surname": "Němcová"
    },
    {
        "gender": "male",
        "name": "Jiří",
        "surname": "Černý"
    }
]

const dtoIn = {
    count: 50,
    age: {
        min: 19,
        max: 35
    }
}

function getRandomBirthdate(age) {
    let birthdate = new Date();

    birthdate.setFullYear(
        birthdate.getFullYear() - (Math.floor(Math.random() * (age.max - age.min + 1) + age.min)),
        Math.round(Math.random() * 11),
        Math.round((Math.random() * 27) + 1)
    )

    return birthdate;
}

function getRandomEmployee(age, czechNames) {
    const randomIndex = Math.floor((Math.random() * 10))
    return {
        gender: czechNames [randomIndex].gender,
        birthdate: getRandomBirthdate(age),
        name: czechNames [randomIndex].name,
        surname: czechNames [randomIndex].surname,
        workload: (Math.ceil(Math.random() * 4) * 10)
    }
}

function generateEmployeeData(dtoIn, czechNames) {
    const dtoOut = []
    for (let i = 0; i < dtoIn.count; i++) {
        let randomEmployee = getRandomEmployee(dtoIn.age, czechNames)
        dtoOut.push(randomEmployee)
    }
    return dtoOut
}

function countGroupedNames(employeeData) {
    const employeeDataMales = employeeData.filter((employee) => employee.gender === "male")
    const employeeDataFemales = employeeData.filter((employee) => employee.gender === "female")
    const employeeDataFemalePartTime = employeeData.filter((employee) => employee.gender === "female" && employee.workload < 40)
    const employeeDataMaleFullTime = employeeData.filter((employee) => employee.gender === "male" && employee.workload === 40)

    return {
        all: {...countEmployeeNames(employeeData)},
        male: {...countEmployeeNames(employeeDataMales)},
        female: {...countEmployeeNames(employeeDataFemales)},
        femalePartTime: {...countEmployeeNames(employeeDataFemalePartTime)},
        maleFullTime: {...countEmployeeNames(employeeDataMaleFullTime)}
    }
}

function countEmployeeNames(filteredEmployeeData) {
    const names = {}
    for (let employee of filteredEmployeeData) {
        if (Object.keys(names).includes(employee.name)) {
            names[employee.name] += 1
        } else {
            names[employee.name] = 1
        }
    }
    return names
}

function getEmployeeChartContent(dtoIn, czechNames) {
    const employeeData = generateEmployeeData(dtoIn, czechNames)
    const names = countGroupedNames(employeeData)
    const dtoOut = {
        names: {
            ...names
        },
        chartData: {
            all: mapNamesToLabelValue(names.all),
            male: mapNamesToLabelValue(names.male),
            female: mapNamesToLabelValue(names.female),
            femalePartTime: mapNamesToLabelValue(names.femalePartTime),
            maleFullTime: mapNamesToLabelValue(names.maleFullTime)
        }
    }
    return dtoOut
}

function mapNamesToLabelValue(names) {
    return Object.entries(names).map(([label, value]) => ({
        label,
        value
    }))
}

function main(dtoIn, czechNames) {
   console.dir(getEmployeeChartContent(dtoIn, czechNames), {depth: null})
}

main(dtoIn, czechNames)
