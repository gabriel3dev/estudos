import { expect, test } from 'vitest';
import { Appointment } from './appointment';
import { getFutureDate } from '../tests/utils/get-future-date';

test('create an appointmenttest', () => {
    const startsAt = getFutureDate('2023-12-17');
    const endsAt = getFutureDate('2023-12-18');

    startsAt.setDate(endsAt.getDate() + 1);
    endsAt.setDate(startsAt.getDate() + 2);

    const appointment = new Appointment({
        customer: 'Jhon Doe',
        startsAt,
        endsAt
    })

    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.customer).toEqual('Jhon Doe');
})

test('Não permite criar um agendamento com data antes da data inicial', () => {
    const startsAt = getFutureDate('2023-12-17');
    const endsAt = getFutureDate('2023-12-16');

    startsAt.setDate(endsAt.getDate() + 2);
    endsAt.setDate(endsAt.getDate() + 1);

    expect(() => {
        return new Appointment({
            customer: 'Jhon Doe',
            startsAt,
            endsAt
        })
    }).toThrow(); 
});


test('Não permite criar um agendamento com data antes da data atual', () => {
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(endsAt.getDate() - 1);
    endsAt.setDate(endsAt.getDate() + 3);

    expect(() => {
        return new Appointment({
            customer: 'Jhon Doe',
            startsAt,
            endsAt
        })
    }).toThrow(); 
});


test('Cannot create an appoinment without costumer', () => {
    const startsAt = getFutureDate('2023-12-17');
    const endsAt = getFutureDate('2023-12-18');
    
    startsAt.setDate(endsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 3);

    expect(() => {
        return new Appointment({
            customer: '',
            startsAt,
            endsAt
        })
    }).toThrow(); 
});