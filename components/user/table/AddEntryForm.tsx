import { Element } from "@craftjs/core";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export const AddEntryForm = ({ fields, onSubmit }) => {
    return (
        <Form onSubmit={onSubmit}>
            {fields.map((field, index) => (
                <Element
                    key={`${field.columnName}-${index}`}
                    id={`form-field-${field.columnName}`}
                    is={FormField}
                    label={field.columnName}
                    name={field.columnName}
                    type={field.type}
                />
            ))}
            <Button type="submit">Submit</Button>
        </Form>
    );
};

AddEntryForm.craft = {
    displayName: 'Add Entry Form',
    props: {
        fields: [],
        onSubmit: () => { },
    },
};