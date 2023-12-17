import { Appointment } from '../../entities/appointment';
import { AppointmentsRepository } from '../../repositories/appointment-repositoriy';
interface CreateAppointmentRequest{
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment{
    constructor(
        private appointmentRepository: AppointmentsRepository
    ) {

    }

    async execute({ customer, startsAt, endsAt }:CreateAppointmentRequest):Promise<CreateAppointmentResponse>{

        const overlappingAppointment = await this.appointmentRepository.findOverlappingAppointment(startsAt, endsAt);

        if (overlappingAppointment) {
            throw new Error('Another appoitnment overlaps this appointment dates')
        }

        const appointment = new Appointment({
            customer,
            startsAt,
            endsAt
        });

        await this.appointmentRepository.create(appointment)

        return appointment;
    }
}