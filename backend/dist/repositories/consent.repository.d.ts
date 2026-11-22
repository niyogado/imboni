export declare class ConsentRepository {
    findByParentAndChannel(parentId: number, channel: string): Promise<Consent | null>;
    upsert(data: {
        parentId: number;
        channel: string;
        status: string;
    }): Promise<Consent>;
    listByParent(parentId: number): Promise<Consent[]>;
}
export declare const consentRepository: ConsentRepository;
//# sourceMappingURL=consent.repository.d.ts.map