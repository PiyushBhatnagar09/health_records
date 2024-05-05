"use client"

import UploadFile from "./UploadFile";
import useSigner from "../state/signer";
import PatientRequestForm from "./PatientRequestForm";
import PendingRequests from "./PendingRequests";
import { useState, useEffect } from "react";
import RecordList from "./RecordList";

export type SharedRecord = {
  patient: string;
  creationTime: number;
  expiryTime: number;
  metahash: string;
}

export default function Page() {
  const { signer, contract, address } = useSigner();

  const [Records, setRecords] = useState<SharedRecord[]>([]);

  useEffect(() => {
    const getRecords = async () => {
      const res = await contract.getValidSharedRecords();
      console.log(res);
      setRecords(
        res.map((item: any[], i: any) => {
          return ({
            patient: item[0],
            creationTime: Number(item[1]),
            expiryTime: Number(item[2]),
            metahash: item[3]
          })
        })
      )
    }
    if (address) {
      getRecords();
    }
  }, [address, contract])

  return (
    <div>
      Doctor Home
      <RecordList records={Records}/>
      <UploadFile contract={contract} />
      <PatientRequestForm />
      <PendingRequests />
    </div>
  )
}