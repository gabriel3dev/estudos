interface AppointmentProps { 
    customer: string
    startsAt: Date
    endsAt: Date
}

export class Appointment { // agendamento
    private props: AppointmentProps;
    
    get customer() {
        return this.props.customer;
    }

    get startsAt(){
        return this.props.startsAt;
    }

    get endsAt(){
        return this.props.endsAt;
    }

    constructor(props:AppointmentProps){
        const { startsAt, endsAt, customer } = props;        

        if(startsAt <= new Date()){
            throw new Error('Data inicial inválida');
        }

        if(endsAt <= startsAt){
            throw new Error('Data final inválida');
        }

        if(customer.trim() === ''){
            throw new Error('Cliente inválido');
        }

        

        this.props = props; 
    }
}