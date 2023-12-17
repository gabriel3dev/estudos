import { Appointment } from '../../entities/appointment';
import { getFutureDate } from '../utils/get-future-date';
import { CreateAppointment } from './create-appointment';
import { InMemoryAppointmentRepository } from '../../repositories/in-memory/appointments';
import { describe, expect, it } from "vitest";

describe('Criar Agendamento', () => {
    it('Criar um agendamento com sucesso', () => {

        const appointmentsRepository = new InMemoryAppointmentRepository()
        const createAppointment = new CreateAppointment(
            appointmentsRepository
        );
        
        const startsAt = getFutureDate('2023-12-16');
        const endsAt = getFutureDate('2023-12-17');
    
        startsAt.setDate(startsAt.getDate() + 1)
        endsAt.setDate(startsAt.getDate() + 2);

        expect(createAppointment.execute({
            customer:'Jhon Doe',
            startsAt,
            endsAt 
        })).resolves.toBeInstanceOf(Appointment);
    })

    it('Não pode criar agendamento com datas iguais', async () => {

        const appointmentsRepository = new InMemoryAppointmentRepository()
        const createAppointment = new CreateAppointment(
            appointmentsRepository
        );
        
        const startsAt = getFutureDate('2023-12-10');
        const endsAt = getFutureDate('2023-12-18');
   
        await createAppointment.execute({
            customer:'Jhon Doe',
            startsAt,
            endsAt
        });

        expect(createAppointment.execute({
            customer:'Jhon Doe',
            startsAt: getFutureDate('2023-12-16'),
            endsAt: getFutureDate('2023-12-17')
        })).rejects.toBeInstanceOf(Error);

        expect(createAppointment.execute({
            customer:'Jhon Doe',
            startsAt: getFutureDate('2023-12-09'),
            endsAt: getFutureDate('2023-12-12')
        })).rejects.toBeInstanceOf(Error);

        expect(createAppointment.execute({
            customer:'Jhon Doe',
            startsAt: getFutureDate('2023-12-08'),
            endsAt: getFutureDate('2023-12-19')
        })).rejects.toBeInstanceOf(Error);

        expect(createAppointment.execute({
            customer:'Jhon Doe',
            startsAt: getFutureDate('2023-12-12'),
            endsAt: getFutureDate('2023-12-14')
        })).rejects.toBeInstanceOf(Error);
    })
})
