import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from 'next'

import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Snackbar, TextField, capitalize } from "@mui/material";
import { Layout } from "../../components/layouts";
import { Delete, DeleteForeverOutlined, SaveOutlined } from "@mui/icons-material";
import { Entry, EntryStatus } from "../../interfaces";
import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries";
import { useRouter } from "next/router";

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']
interface Props {
    entry: Entry;
}


const EntryPage: FC<Props> = ({ entry }) => {
    const { replace } = useRouter()
    const { updatedEntry, deleteEntry } = useContext(EntriesContext)
    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false);
    const [isUpdateOk, setIsUpdateOk] = useState(false)

    const onInputValueChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    }
    const onStatusChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStatus(event.target.value as EntryStatus);
    }
    const onSave = async () => {
        if (inputValue.trim().length === 0) return;
        const updatedEntryData: Entry = {
            ...entry,
            status,
            description: inputValue
        }
        const result: any = await updatedEntry(updatedEntryData)
        result.status === 200 && setIsUpdateOk(true)
    }
    const onDelete = async () => {
        const result: any = await deleteEntry(entry._id)
        result.status === 200 && replace('/')

    }

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    console.log(((inputValue === entry.description) || (inputValue.length <= 0)) && (status === entry.status));
    
    return (
        <Layout title={`${inputValue.substring(0, 20) + '...'}`}>
            <Grid
                container
                justifyContent={'center'}
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <Grid
                            onClick={onDelete}
                            sx={{
                                backgroundColor: "#ff1744",
                                borderRadius: "1rem",
                                width: "45px",
                                height: "45px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                right: "2rem",
                                bottom: "2rem",
                                cursor: "pointer",

                            }}
                        >
                            <Delete

                            />
                        </Grid>
                        <CardHeader
                            title={`Entrada: ${inputValue}`}
                            subheader={`Creada hace xd`}
                        />
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                autoFocus
                                placeholder="Nueva entrada"
                                multiline
                                label="Nueva entrada"
                                value={inputValue}
                                onChange={onInputValueChange}
                                helperText={isNotValid && `Ingrese un Valor`}
                                onBlur={() => setTouched(true)}
                                error={isNotValid}
                            />
                            <FormControl>
                                <FormLabel>Estado: </FormLabel>
                                <RadioGroup
                                    value={status}
                                    onChange={onStatusChanged}
                                    row
                                >
                                    {validStatus.map((status => (
                                        <FormControlLabel
                                            key={status}
                                            value={status}
                                            control={<Radio />}
                                            label={capitalize(status)}
                                        />

                                    )))}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveOutlined />}
                                variant='contained'
                                fullWidth
                                disabled={((inputValue === entry.description && status === entry.status ) || (inputValue.length <= 0)) }
                                onClick={onSave}
                            >
                                Save
                            </Button>
                        </CardActions>


                    </Card>
                </Grid>
                {isUpdateOk &&
                    <Snackbar
                        open
                        autoHideDuration={5000}
                        onClose={() => setIsUpdateOk(false)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}

                    >
                        <Alert
                            style={{ backgroundColor: "#0be649", color: 'black' }}
                            severity="success">This is a success message!</Alert>
                    </Snackbar>
                }
            </Grid>
        </Layout>
    )
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // const { data } = await  // your fetch function here 

    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById(id)

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {
            entry: entry
        }
    }

}

export default EntryPage;