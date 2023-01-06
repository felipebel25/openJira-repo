import { AddCircleOutlined, SaveOutlined } from "@mui/icons-material"
import { Box, Button, TextField } from "@mui/material"
import { ChangeEvent, useContext, useState } from "react"
import { EntriesContext } from "../../../context/entries"
import { UIContext } from "../../../context/ui"

export const NewEntry = () => {
    const { addNewEntry } = useContext(EntriesContext)
    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)
    const [inputValue, setInputValue] = useState('');
    const [isTouch, setIsTouch] = useState(false);
    const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInputValue(event.target.value);

    const onSave = () => {
        inputValue.length > 0 && addNewEntry(inputValue)
        setIsAddingEntry(false)
        setIsTouch(false)
        setInputValue('')
    };


    return (
        <Box sx={{ mb: 2, paddingX: 2 }}>
            {isAddingEntry ?
                <>
                    <TextField
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        autoFocus
                        multiline
                        label='Nueva Entrada'
                        helperText={inputValue.length <= 0 && isTouch && 'Ingrese un valor'}
                        error={inputValue.length <= 0 && isTouch}
                        value={inputValue}
                        onBlur={() => setIsTouch(true)}
                        onChange={onTextFieldChanged}
                    />
                    <Box display={'flex'} justifyContent='space-between'>
                        <Button
                            // sx={{ margin: "0.5rem" }}
                            variant="outlined"
                            color="secondary"
                            onClick={() => setIsAddingEntry(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            // sx={{ margin: "0.5rem" }}
                            variant="outlined"
                            color="secondary"
                            endIcon={<SaveOutlined />}
                            onClick={onSave}
                        >
                            Guardar
                        </Button>
                    </Box>
                </>
                :
                (
                    <Button
                        startIcon={<AddCircleOutlined />}
                        fullWidth
                        variant="outlined"
                        color="primary"
                        onClick={() => setIsAddingEntry(true)}
                    >
                        Agregar Tarea
                    </Button>
                )
            }

        </Box>
    )
}
