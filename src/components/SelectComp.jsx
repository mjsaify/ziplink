/* eslint-disable react/prop-types */
import { FormControl } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectComp = ({ field }) => {

  return (
    <Select onValueChange={field.onChange} defaultValue={field.value} className="w-full">
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">In-active</SelectItem>
        <SelectItem value="expired">Expired</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SelectComp