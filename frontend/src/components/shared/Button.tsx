import type { ButtonProps } from '../../types';

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  className = '',
  disabled = false,
}: ButtonProps) => {
  const baseStyles = 'font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-500',
    secondary: 'bg-white/70 text-teal-700 border-2 border-teal-700 hover:bg-teal-50/70 focus:ring-teal-500',
    tertiary: 'text-teal-700 hover:bg-teal-50 focus:ring-teal-500',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button
      className={combinedStyles}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
