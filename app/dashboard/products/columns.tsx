"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { deleteProduct } from "@/server/actions/delete-product";
import { toast } from "sonner";


type ProductColumn = {
  image: string;
  title: string;
  price: number;
  variant: any;
};


const ActionCell = ({row} : {row :  Row<ProductColumn>}) => {

    const {status, execute} = useAction(deleteProduct, {
        onSuccess : (data) => {
          toast.dismiss(); // Dismiss the loading message

            if(data.data?.error) {
              toast.error(data.data.error)
          }
          if(data.data?.success) {
            toast.success(data.data.success)
          }
        },
        onExecute : ( ) => {
          const toastId = toast.loading('Deleting Product');
          execute().finally(() => toast.dismiss(toastId)); 
        }
    })


    const product = row.original;
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} ><MoreHorizontal className="w-4 h-4"/></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className=" cursor-pointer dark:focus:bg-primary focus:bg-primary/50" >Edit Product</DropdownMenuItem>
          <DropdownMenuItem
          onClick={()=> execute({id: product.id})}
           className="dark:focus:bg-destructive focus:bg-destructive/50 cursor-pointer " >Delete Product</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}



export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "variants",
    header: "Varians",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div className="font-medium text-xs">{formatted}</div>;
    },
  },
  {
    accessorKey: "image",
    header: "Imge",
    cell: ({ row }) => {
      const cellImage = row.getValue("image") as string;
      const cellTitle = row.getValue("title") as string;
      return (
        <div className="">
          <Image
            src={cellImage}
            width={50}
            height={50}
            alt={cellTitle}
            className=" rounded-md"
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ActionCell
  },
];
