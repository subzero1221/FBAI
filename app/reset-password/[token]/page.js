import ResetPasswordForm from '@/app/_mainComponents/ResetPasswordForm';

export default function ResetPasswordPage({ params }) {
  const token = params?.token || '';
  return <ResetPasswordForm token={token} />;
} 