import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getAuthUserDetails } from "@/lib/queries";
import { SubAccount } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteButton from "./_components/delete-button";
import CreateSubaccountButton from "./_components/create-subbacount-button";

type Props = {
  params: {
    agencyId: string;
  };
};

const SubAccountsPage = async ({ params }: Props) => {
  const user = await getAuthUserDetails();
  if (!user) return;

  return (
    <AlertDialog>
      <div className="flex flex-col">
        <CreateSubaccountButton
          user={user}
          id={params.agencyId}
          className="w-[200px] self-end m-6"
        />
        <Command className="rounded-lg bg-transparent">
          <CommandInput placeholder="Search Accounts..."></CommandInput>
          <CommandList>
            <CommandEmpty>No Results Found.</CommandEmpty>
            <CommandGroup heading="Sub Accounts">
              {!!user.Agency?.SubAccount.length ? (
                user.Agency.SubAccount.map((subAccount: SubAccount) => (
                  <CommandItem
                    key={subAccount.id}
                    className="h-32 !bg-background my-2 text-primary border-[1px] border-border p-4 rounded-lg hover:!bg-background cursor-pointer transition-all"
                  >
                    <Link
                      href={`/subaccount/${subAccount.id}`}
                      className="flex gap-4 w-full h-full"
                    >
                      <div className="relative w-32">
                        <Image
                          src={subAccount.subAccountLogo}
                          alt="Subaccount Logo"
                          fill
                          className="rounded-md object-contain bg-muted/50 p-4"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-col">
                          {subAccount.name}
                          <span className="text-muted-foreground text-xs">
                            {subAccount.address}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="text-red-200 w-20 hover:bg-red-600 hover:text-white"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-left">
                          Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-left">
                          This action cannot be undone. This will delete the
                          subaccount and all data related to this subaccount.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex items-center">
                        <AlertDialogCancel className="mb-2">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive hover:bg-destructive">
                          <DeleteButton subaccountId={subAccount.id} />
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </CommandItem>
                ))
              ) : (
                <div className="text-muted-foreground text-center p-4">
                  No Sub Accounts
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </AlertDialog>
  );
};

export default SubAccountsPage;