export class CalculatorADapter{

  static isPowerOfTwo(n: number): boolean { 
    // return Math.log2(n) % 1 === 0; // solución alternativa
    return (n & (n - 1)) === 0;
  }
}