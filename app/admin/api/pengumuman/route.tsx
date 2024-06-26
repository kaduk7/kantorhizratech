import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'; 

export const POST = async (request: Request) => {
        const formData = await request.formData()
        const divisi = formData.getAll('divisi').map(String);
        const pengumuman = await prisma.pengumumanTb.create({
            data: {
                judul: String(formData.get('judul')),
                tanggalPengumuman: String(formData.get('tanggalPengumuman')),
                isi: String(formData.get('isi')),
                divisi: divisi.join(', '),
            },
        })
        
        return NextResponse.json([pengumuman], { status: 201 })

}

export const GET = async () => {
        const jobdesk = await prisma.pengumumanTb.findMany({
            orderBy: {
                id: "asc"
            }
        });
        return NextResponse.json(jobdesk, { status: 200 })
}

