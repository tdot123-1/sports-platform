import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MultiselectDropdownProps<T extends Record<string, string>> {
  trigger: string;
  subTitle: string;
  optionsMap: T;
  initialValues: (keyof T)[];
  pending: boolean;
}

const MultiselectDropdown = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>Trigger</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sub title (select age groups)</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/**
           * optionsArray.map(() => ())
           */}
          <DropdownMenuCheckboxItem></DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MultiselectDropdown;
