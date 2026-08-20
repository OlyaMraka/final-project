import {IGroup} from "../interfaces/group.interface";
import {CourseFormat} from "../enums/course-format.enum";
import {CourseName} from "../enums/course-name.enum";
import {ApplicationStatus} from "../enums/application-status.enum";
import {TariffName} from "../enums/tariff-name.enum";
import {Group} from "../models/group.model";
import {Application} from "../models/application.model";

class ApplicationSeeder {
    private readonly GROUP_COUNT = 15;
    private readonly LEAD_COUNT = 500;

    public async seed(): Promise<void> {
        const applicationsCount = await Application.countDocuments();
        if (applicationsCount > 0) {
            return;
        }

        const groups = await this.getGroups();
        const applications = this.createLeads(groups);

        await Application.insertMany(applications);
    }

    private async getGroups(): Promise<IGroup[]> {
        const existingGroups = await Group.find();

        if (existingGroups.length > 0) {
            return existingGroups;
        }

        return this.createGroups();
    }

    private async createGroups(): Promise<IGroup[]> {
        const groups = Array.from(
            {length: this.GROUP_COUNT},
            (_, index) => ({
                name: `Group ${index + 1}`,
            })
        );

        return Group.insertMany(groups);
    }

    private createLeads(groups: IGroup[]) {
        return Array.from(
            {length: this.LEAD_COUNT},
            (_, index) => {
                const tariff = this.getRandomValue(
                    Object.values(TariffName)
                );

                const sum = this.getSum(tariff);

                return {
                    name: this.getRandomValue([
                        "Olga",
                        "Anna",
                        "Maxim",
                        "Ivan",
                        "Sofia",
                        "Maria",
                        "Dmytro",
                        "Andrii",
                        "Iryna",
                        "Kateryna",
                    ]),

                    surname: this.getRandomValue([
                        "Smith",
                        "Johnson",
                        "Brown",
                        "Wilson",
                        "Taylor",
                        "Anderson",
                        "Miller",
                        "Davis",
                        "Moore",
                        "Clark",
                    ]),

                    email: `student${index + 1}@example.com`,

                    phone: this.getRandomPhone(),

                    age: this.getRandomAge(),

                    course: this.getRandomValue(
                        Object.values(CourseName)
                    ),

                    format: this.getRandomValue(
                        Object.values(CourseFormat)
                    ),

                    tariff,

                    status: this.getRandomValue(
                        Object.values(ApplicationStatus)
                    ),

                    groupId: this.getRandomValue(groups)._id,

                    sum,

                    alreadyPaid: this.getAlreadyPaid(sum),

                    startDate: this.getRandomStartDate(),

                    endDate: this.getRandomEndDate(),

                    message: `test - ${Math.random()}`,
                    utm: "test"
                };
            }
        );
    }

    private getSum(tariff: TariffName): number {
        const prices: Record<TariffName, number> = {
            [TariffName.PRO]: 1000,
            [TariffName.MINIMAL]: 500,
            [TariffName.PREMIUM]: 1500,
            [TariffName.INCUBATOR]: 2000,
            [TariffName.VIP]: 2500,
        };

        return prices[tariff];
    }

    private getAlreadyPaid(sum: number): number {
        const percentages = [
            0,
            0,
            0.25,
            0.5,
            0.75,
            1,
        ];

        const percentage = this.getRandomValue(percentages);

        return sum * percentage;
    }

    private getRandomPhone(): string {
        return `+380${Math.floor(
            100000000 + Math.random() * 900000000
        )}`;
    }

    private getRandomAge(): number {
        return Math.floor(
            18 + Math.random() * 30
        );
    }

    private getRandomValue<T>(values: T[]): T {
        return values[
            Math.floor(Math.random() * values.length)
            ];
    }

    private getRandomStartDate(): Date {
        const start = new Date(
            2025,
            0,
            1
        ).getTime();

        const end = new Date(
            2026,
            10,
            1
        ).getTime();

        return new Date(
            start + Math.random() * (end - start)
        );
    }

    private getRandomEndDate(): Date {
        const start = new Date(
            2026,
            0,
            1
        ).getTime();

        const end = new Date(
            2027,
            5,
            1
        ).getTime();

        return new Date(
            start + Math.random() * (end - start)
        );
    }
}

export const leadSeeder = new ApplicationSeeder();
