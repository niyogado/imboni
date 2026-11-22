import { prisma } from '../config/database';
import type {  } from '@prisma/client';

export class ConsentRepository {
  async findByParentAndChannel(parentId: number, channel: string): Promise<Consent | null> {
    return prisma.consent.findUnique({
      where: {
        parentId_channel: { parentId, channel: channel as any },
      },
    });
  }

  async upsert(data: {
    parentId: number;
    channel: string;
    status: string;
  }): Promise<Consent> {
    const existing = await this.findByParentAndChannel(data.parentId, data.channel);
    if (existing) {
      return prisma.consent.update({
        where: { id: existing.id },
        data: { status: data.status as any },
      });
    }
    return prisma.consent.create({
      data: {
        parentId: data.parentId,
        channel: data.channel as any,
        status: data.status as any,
      },
    });
  }

  async listByParent(parentId: number): Promise<Consent[]> {
    return prisma.consent.findMany({
      where: { parentId },
    });
  }
}

export const consentRepository = new ConsentRepository();
