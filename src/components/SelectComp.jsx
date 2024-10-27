import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectComp = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] bg-grey text-white border-grey-lite mt-4">
        <SelectValue className="" placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">In-active</SelectItem>
          <SelectItem value="expired">Expired</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectComp