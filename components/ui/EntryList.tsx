import { List, Paper } from "@mui/material"
import { DragEvent, FC, useContext, useMemo } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { EntryStatus } from "../../interfaces"
import { EntryCard } from "./EntryCard"
import classes from '../../styles/entryList.module.css'

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
    const { entries, updatedEntry } = useContext(EntriesContext)
    const { isDragging, endDragging } = useContext(UIContext)


    const entriesByStatus = useMemo(() => entries.filter((entrie) => entrie.status === status), [entries])

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text')

        const entry = entries.find(e => e._id === id)!

        entry.status = status;
        updatedEntry(entry)
        endDragging()
    }



    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? classes.dragging : ''}
        >
            <Paper sx={{ height: "calc(100vh - 164px)", overflowY: "scroll", backgroundColor: "transparent", padding: '1px 5px' }}>

                <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all .3s' }}>

                    {entriesByStatus.map((entry) => (
                        <EntryCard key={entry._id} entry={entry} />
                    ))}
                </List>
            </Paper>
        </div>
    )
}
