import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { memo } from 'react';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  data: DropdownItem[];
  placeholder?: string;
  className?: string;
  isRequired?: boolean;
};

type DropdownItem = {
  id: number;
  name: string;
};

const DropdownInputComponent = <T extends FieldValues>({ name, label, className, data, placeholder, isRequired }: Props<T>) => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem className={`flex flex-col ${className}`}>
          <FormLabel className="text-sm md:text-base font-medium">
            {label} {isRequired && <span className="text-destructive">*</span>}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} className="text-sm md:text-base font-medium" />
            </SelectTrigger>
            <SelectContent>
              {data.map((item) => (
                <SelectItem key={item.id} value={`${item.id}`}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};

const DropdownInput = memo(DropdownInputComponent) as typeof DropdownInputComponent;

export default DropdownInput;
