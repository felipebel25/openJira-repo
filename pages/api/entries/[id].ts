import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'

type Data =
    | { message: string }
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "El id no es valido" + id })

    }

    switch (req.method) {
        case 'GET':
            return getEntry(req, res)
        case 'PUT':
            return updateEntry(req, res)
            break;
        case 'DELETE':
            return deleteEntry(req, res)
            break;
        default:
            return res.status(400).json({ message: "Metodo no existe" })
            break;
    }

}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById(id)
    if (!entryToUpdate) {
        await db.disconnect();
        return res.status(400).json({ message: "No existe este id" + id })
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } = req.body;


    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
        await db.disconnect();
        return res.status(200).json(updatedEntry!)
    } catch (error: any) {
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message })

    }
}
const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById(id)
    if (!entryToUpdate) {
        await db.disconnect();
        return res.status(400).json({ message: "No existe este id" + id })
    }
    try {
        const deleteEntry = await Entry.findByIdAndDelete(id)
        await db.disconnect();
        return res.status(200).json(deleteEntry!)
    } catch (error: any) {
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message })

    }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();

    const entry = await Entry.findById(id)
    if (!entry) {
        await db.disconnect();
        return res.status(400).json({ message: "No existe este id" + id })
    }

    return res.status(200).json(entry)
    // try {
    //     const entry = await Entry.findById(id)
    //     await db.disconnect();
    //     return res.status(200).json(entry!)
    // } catch (error: any) {
    //     await db.disconnect();
    //     res.status(400).json({ message: error.errors.status.message })

    // }


}