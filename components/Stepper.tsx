import { useStepper } from '../hooks';

export const Step = ({ isActive, children }) => (isActive ? children : null);

export default function Stepper({ children }) {
  const [activeStep, stepForward, stepBackward, resetStepper] = useStepper();

  return children(activeStep, stepForward, stepBackward, resetStepper);
}
