#! /usr/bin/env node
import inquirer from "inquirer";
async function startCountdown() {
    const { targetDateTime } = await inquirer.prompt([
        {
            name: "targetDateTime",
            type: "input",
            message: "Choose your target date and time (yyyy-mm-dd hh:mm):",
            default: new Date().toISOString().slice(0, 16).replace("T", " ")
        },
    ]);
    const targetDate = new Date(targetDateTime.replace(" ", "T"));
    function calculateTimeRemaining(targetDate) {
        const currentTime = new Date();
        const timeDifference = targetDate.getTime() - currentTime.getTime();
        const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        return { remainingDays, remainingHours, remainingMinutes, remainingSeconds };
    }
    function updateCountdown() {
        const { remainingDays, remainingHours, remainingMinutes, remainingSeconds } = calculateTimeRemaining(targetDateTime);
        console.log(`${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds left`);
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
}
startCountdown();
