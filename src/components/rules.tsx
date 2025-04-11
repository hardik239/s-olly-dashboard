import { ArrowLeft } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Rules = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger className="absolute right-16 top-16 text-blue-900 font-medium text-lg group flex items-center gap-2 hover:underline underline-offset-4">
          <ArrowLeft className="group-hover:-translate-x-1 transition-all" />{" "}
          Check Rules
        </SheetTrigger>
        <SheetContent className="w-[800px] overflow-auto p-4 bg-[ghostwhite]">
          <SheetHeader>
            <SheetTitle className="text-2xl">
              Rules for Jira Ticket Management
            </SheetTitle>
            <SheetDescription>
              <div className="p-2 px-8">
                <ul className="text-sm text-gray-700 list-disc">
                  <li>
                    <p className="p-2 pb-1">
                      <b>Tickets Management</b>: The spreadsheet must include
                      [Team_Name]_tickets tab to identify the all tickets.{" "}
                      <br />
                      For e.g: <b>Wizards_tickets</b>
                    </p>
                  </li>
                  <li>
                    <p className="p-2 pb-1">
                      <b>Capacity Planning</b>: The spreadsheet must include
                      [Team_Name]_capacity tab to identify the template for
                      capacity planning. For e.g <b>Wizards_capacity</b>
                      <br />
                      <br /> <b>Note</b>: Make sure that team name is same for
                      both tabs
                    </p>
                  </li>
                  <li>
                    <p className="p-2 pb-1">
                      <b>Jira Status Options</b>: The "Jira Status" column
                      should have the following values
                    </p>
                    <ul className="text-sm text-gray-700 list-decimal p-2 pl-8">
                      <li className="pb-1">
                        <span className="font-semibold">To Do:</span> The ticket
                        is not yet started.
                      </li>
                      <li className="pb-1">
                        <span className="font-semibold">In Progress:</span> Work
                        on the ticket is currently ongoing.
                      </li>
                      <li className="pb-1">
                        <span className="font-semibold">In Review:</span> The
                        ticket is under review.
                      </li>
                      <li className="pb-1">
                        <span className="font-semibold">
                          Ready For Verification:
                        </span>{" "}
                        The ticket is complete and ready to be verified.
                      </li>
                      <li className="pb-1">
                        <span className="font-semibold">
                          Ready For Acceptance:
                        </span>{" "}
                        The ticket is complete and awaiting acceptance.
                      </li>
                      <li className="pb-1">
                        <span className="font-semibold">Resolved:</span> The
                        ticket has been resolved.
                      </li>
                      <li className="pb-1">
                        <span className="font-semibold">Blocked:</span> Work on
                        the ticket is halted due to external factors.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p className="p-2 pb-1">
                      <b>Ticket Type Options</b>: The "Type" column should
                      include the following values
                    </p>
                    <ul className="text-sm text-gray-700 list-decimal p-2 pl-8">
                      <li className="pb-1">
                        <span className="font-semibold">Task:</span> A unit of
                        work that needs to be completed.
                      </li>
                      <li className="pb-1">
                        <span className="font-semibold">Story:</span> A feature
                        or functionality that is to be delivered.
                      </li>
                      <li className="pb-1">
                        <span className="font-semibold">Bug:</span> An issue or
                        error that needs fixing.
                      </li>
                      <li className="pb-1">
                        <span className="font-semibold">MR Review:</span> A
                        ticket related to code review (Merge Request Review).
                      </li>
                      <li className="pb-1">
                        <span className="font-semibold">Spike Task:</span> A
                        research or investigation task to explore solutions.
                      </li>
                      <li className="pb-1">
                        <span className="font-semibold">Spike Story:</span> A
                        story focused on research or exploration.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p className="p-2 pb-1">
                      <b>PR (Pull Request) Status Options</b>: The &quot;PR
                      Status&quot; column should have the following values
                    </p>
                    <ul className="text-sm text-gray-700 list-decimal p-2 pl-8">
                      <li className="pb-1">
                        <span className="font-semibold">In Progress:</span> The
                        pull request is currently being worked on.
                      </li>
                      <li className="pb-1">
                        <span className="font-semibold">In Review:</span> The
                        pull request is under review by peers.
                      </li>
                      <li className="pb-1">
                        <span className="font-semibold">Merged:</span> The pull
                        request has been successfully merged.
                      </li>
                      <li className="pb-1">
                        <span className="font-semibold">- :</span> The PR is not
                        applicable.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Rules;
