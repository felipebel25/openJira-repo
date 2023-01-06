import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data =
    | { message: string }
    | IEntry[]
    | IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case "GET":
            return getEntries(res)
            break;
        case "POST":
            return postEntry(req, res)
        case 'PUT':
            return putEntry(req, res)
        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
            break;
    }
}


const getEntries = async (res: NextApiResponse<Data>) => {
    await db.connect();
    const entries = await Entry.find().sort({ createdAt: "ascending" })
    await db.disconnect()
    res.status(200).json(entries)
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { description = '' } = req.body
    const newEntry = new Entry({
        description: description,
        createdAt: Date.now()
    })
    // const entries = await Entry.find().sort({ createdAt: "ascending" })

    try {
        await db.connect();
        await newEntry.save();
        await db.disconnect()
        res.status(201).json(newEntry)
    } catch (error) {
        await db.disconnect()
        console.log(error)
        res.status(500).json({ message: 'algo salio mal' })

    }
}

const putEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {


    
}
