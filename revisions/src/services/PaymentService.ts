import { PaymentService } from './OrderService';

export class PaymentServiceImpl implements PaymentService {
  processPayment(amount: number) {
    // Simulation d'un paiement réussi
    return { success: true, transactionId: 'TX123' };
  }
}
