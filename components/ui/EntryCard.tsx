import { DeleteForeverOutlined } from "@mui/icons-material";
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { DragEvent, FC, useContext } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { Entry } from "../../interfaces";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { getFormatDistanceToNow } from "../../utils";

interface Props {
    entry: Entry;

}

export const EntryCard: FC<Props> = ({ entry }) => {
    const { push } = useRouter()
    const { deleteEntry } = useContext(EntriesContext)
    const { startDragging, endDragging } = useContext(UIContext)

    const onDelete = async (e: any) => {
        e.stopPropagation()
        const result: any = await deleteEntry(entry._id)
    }
    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text', entry._id)
        startDragging()
    }
    const onDragEnd = () => {
        endDragging()
    }
    const onRedirectTo = () => {
        push(`/entries/${entry._id}`)
    }

    return (
        <>
            <Card
                onClick={onRedirectTo}
                sx={{ marginBottom: 1 }}
                //drag events
                draggable
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            >
                <CardActionArea>
                    <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ whiteSpace: "pre-line" }}>{entry?.description}</Typography>
                        <Box
                            sx={{
                                border: '1px solid red',
                                position: "relative",
                                zIndex: 3
                            }}
                        >

                            <DeleteForeverOutlined
                                onClick={onDelete}
                            />
                        </Box>
                    </CardContent>
                    <CardActions sx={{ display: "flex", justifyContent: "flex-end", paddingRight: 2 }}>
                        <Typography variant="body2">Creada hace {getFormatDistanceToNow(entry.createdAt)}</Typography>
                    </CardActions>
                </CardActionArea>
            </Card>
        </>
    )
}
