import {CourseTariff} from "../models/courseTariff.model";
import {Course} from "../models/course.model";
import {Tariff} from "../models/tariff.model";
import {CourseType} from "../enums/courseType";

class CourseTariffSeeder {
    private getPrice(tariffName: string, courseFormat: CourseType): number {
        const baseByTariffName: Record<string, number> = {
            pro: 1000,
            minimal: 500,
            premium: 1500,
            incubator: 2000,
            vip: 2500,
        };

        const base = baseByTariffName[tariffName] ?? 100;
        const multiplier = courseFormat === CourseType.STATIC ? 1.2 : 1;

        return Math.round(base * multiplier);
    }

    public async seed(): Promise<void> {
        const courses = await Course.find({}, {_id: 1});
        const tariffs = await Tariff.find({}, {_id: 1, name: 1});
        const formats = Object.values(CourseType);

        if (courses.length === 0 || tariffs.length === 0) {
            return;
        }

        const operations: Parameters<typeof CourseTariff.bulkWrite>[0] = [];

        for (const course of courses) {
            for (const tariff of tariffs) {
                for (const format of formats) {
                    operations.push({
                        updateOne: {
                            filter: {
                                courseId: course._id,
                                tariffId: tariff._id,
                                courseFormat: format,
                            },
                            update: {
                                $setOnInsert: {
                                    courseId: course._id,
                                    tariffId: tariff._id,
                                    courseFormat: format,
                                    price: this.getPrice(String(tariff.name), format),
                                },
                            },
                            upsert: true,
                        },
                    });
                }
            }
        }

        if (operations.length > 0) {
            await CourseTariff.bulkWrite(operations);
        }
    }
}

export const courseTariffSeeder = new CourseTariffSeeder();

