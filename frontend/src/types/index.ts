export interface CategoryCardProps {
  id: string;
  title: string;
  image: string;
  onClick?: (id: string) => void;
}

export interface HeaderIconProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  badge?: number;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
