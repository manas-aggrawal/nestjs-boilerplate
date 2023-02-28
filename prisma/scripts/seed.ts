import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	console.log('Seeding the database...');
	await prisma.user.create({
		data: {
			username: 'admin',
			password: '$2a$12$y8zMDrKyUO.HttlUxsSNjeoPh.1a2I/skagtn7dbdEjAd9UF1zIqi', // admin
		},
	});
	await prisma.crudSample.createMany({
		data: [
			{
				testField1: 'testField1',
				testField2: 0,
				testField3: false,
			},
			{
				testField1: 'testField2',
				testField2: 0,
				testField3: false,
			},
			{
				testField1: 'testField3',
				testField2: 0,
				testField3: false,
			},
			{
				testField1: 'testField4',
				testField2: 0,
				testField3: false,
			},
			{
				testField1: 'testField5',
				testField2: 0,
				testField3: false,
			},
		],
	});
	console.log('Seed successfuly completed.');
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.log(e);
		console.error(
			'Seed failed. Make sure theres nothing in the database before running the script.',
		);
		await prisma.$disconnect();
		process.exit(1);
	});
