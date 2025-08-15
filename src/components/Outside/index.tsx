/**
 * src\components\Outside\index.tsx
 */
import { TruckStatus } from "@interfeces";
import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
export function OutsideFC(): React.JSX.Element {
      const [startDate, setStartDate] = useState<Date | null>(null);
      const [isOpen, setIsOpen] = useState(false);

    return (<>
    <section className="side">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <header className="h">
                    <h3>Your location's status</h3>
                    <p>What you do now?</p>
                </header>
            <div className="truck truck-status select">
                <select defaultValue="Pick a color" className="select-positions">
                    <option disabled={true}>Your status?</option>
                    <option>{TruckStatus.CURRENT}</option>
                    <option>{TruckStatus.PICKUP}</option>
                    <option>{TruckStatus.DROPOFF}</option>
                    <option>{TruckStatus.OffDUTY}</option>
                    <option>{TruckStatus.SLEEPER_BERTHER}</option>
                    <option>{TruckStatus.DRIWING}</option>
                    <option>{TruckStatus.OnDUTY}</option>
                </select>    
            </div>
            <header className="h">
                <h3>Your location</h3>
                <p>latitude & longitude?</p>
            </header>
            <div className="truck truck-location">
                <label className="label">
                    <input type="text" className="input input-xs" placeholder="lat:" />
                </label>
                <label className="label">
                    <input type="text" className="input input-xs" placeholder="Lng:" />
                </label>
            </div>
            <header className="h">
                <h3>Pick data & time</h3>
                <p>What your data & time of location?</p>
            </header>
            <div className="truck truck-timer pika-single">
                {/* calendar of date*/}
                 <div className="relative">
                    <div className="join">
                        <input
                        className="input input-bordered join-item"
                        value={startDate?.toLocaleDateString() || ''}
                        readOnly
                        onClick={() => setIsOpen(!isOpen)}
                        placeholder="Выберите дату"
                        />
                        <button 
                        className="btn btn-square join-item"
                        onClick={() => setIsOpen(!isOpen)}
                        >
                        📅
                        </button>
                    </div>
                    
                    {isOpen && (
                        <div className="absolute z-10 mt-1">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                            setStartDate(date);
                            setIsOpen(false);
                            }}
                            inline
                        />
                        </div>
                    )}
                </div>
                <label className="label">
                    <input type="time" placeholder="02:00" className="input input-xs" />
                </label>
            </div>
            
            <button className="btn btn-neutral mt-4">Send</button>
        </fieldset>
    </section>
    </>);
}
