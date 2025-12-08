import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';

interface Props {
  title: string;
  message: string;
}

const FormErrorAlert:React.FC<Props> = ({ title, message }) => {
  return (
    <Alert className="text-red-500" variant="destructive">
      <AlertCircleIcon />
      <AlertTitle >{title}</AlertTitle>
      <AlertDescription>
        <p>{message}.</p>
      </AlertDescription>
    </Alert>
  );
};

export default FormErrorAlert;