import CustomSelect from "../ui/CustomSelect";
import type { SelectOption } from "@/types/global";
import { useUser } from "@/hooks/useUser";

interface Props {
    handleSelect: (value: SelectOption | null) => void;
    selectedValue: SelectOption | null;
}

export default function SearchEmployee({ handleSelect, selectedValue }: Props) {
    const { userOptions, searchUsers } = useUser();
    return (
        <CustomSelect
            label="Selecciona un colaborador *"
            options={userOptions}
            selectedValue={selectedValue}
            onSelect={(value) => handleSelect(value)}
            searchFuntion={searchUsers}
        />
    )
}
