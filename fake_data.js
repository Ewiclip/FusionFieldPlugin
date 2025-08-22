// Embedded XML data as a string
const embeddedXMLData = `<?xml version="1.0" encoding="UTF-8"?>
<activity>
    <activityId>IB31319</activityId>
    <activityType>installation</activityType>
    <stations>
        <station>
            <stationId>STN001</stationId>
            <stationName>Pole Installation Site A</stationName>
            <location>North Field</location>
            <status>Open</status>
            <checkedOutByName></checkedOutByName>
            <checkedOutByID></checkedOutByID>
            <stationCUs>
                <stationCU>
                    <stationCUstockNumber>2313092</stationCUstockNumber>
                    <stationCUDescription>ANCHOR,GUY,SCREW,14 IN</stationCUDescription>
                    <stationCUId>CU001</stationCUId>
                    <stationCUType>Anchor</stationCUType>
                    <stationCUQuantityRequired>1</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>0</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Remove</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                 </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313099</stationCUstockNumber>
                    <stationCUDescription>ROD,ANCHOR,HELIX,1-1/2 IN SQ,5 FT,GALV STL</stationCUDescription>
                    <stationCUId>CU002</stationCUId>
                    <stationCUType>Rod</stationCUType>
                    <stationCUQuantityRequired>1</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>0</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Remove</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                 </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313138</stationCUstockNumber>
                    <stationCUDescription>ANCHOR,POLE,SQ SHFT,TRIPLE,10-12-14 IN,TRIPLE,GALV</stationCUDescription>
                    <stationCUId>CU003</stationCUId>
                    <stationCUType>Anchor</stationCUType>
                    <stationCUQuantityRequired>1</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>1</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                 </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313145</stationCUstockNumber>
                    <stationCUDescription>CABLE,GUY,1/4 IN,7 STRAND,GALV STL</stationCUDescription>
                    <stationCUId>CU004</stationCUId>
                    <stationCUType>Cable</stationCUType>
                    <stationCUQuantityRequired>2</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>1</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                 </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313152</stationCUstockNumber>
                    <stationCUDescription>CLAMP,CABLE,1/4 IN,GUY WIRE</stationCUDescription>
                    <stationCUId>CU005</stationCUId>
                    <stationCUType>Clamp</stationCUType>
                    <stationCUQuantityRequired>4</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>2</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                 </stationCU>
            </stationCUs>
        </station> 
        <station>
            <stationId>STN002</stationId>
            <stationName>Pole Installation Site B</stationName>
            <location>South Field</location>
            <status>Checked Out</status>
            <checkedOutByName>Stagner, Don</checkedOutByName>
            <checkedOutByID>E81049</checkedOutByID>
            <stationCUs>
                <stationCU>
                    <stationCUstockNumber>2313200</stationCUstockNumber>
                    <stationCUDescription>POLE,WOOD,CLASS 3,35 FT,PRESSURE TREATED</stationCUDescription>
                    <stationCUId>CU006</stationCUId>
                    <stationCUType>Pole</stationCUType>
                    <stationCUQuantityRequired>1</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>0</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313207</stationCUstockNumber>
                    <stationCUDescription>BRACKET,POLE,TRANSFORMER,HEAVY DUTY</stationCUDescription>
                    <stationCUId>CU007</stationCUId>
                    <stationCUType>Bracket</stationCUType>
                    <stationCUQuantityRequired>1</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>1</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313214</stationCUstockNumber>
                    <stationCUDescription>BOLT,HEX,3/4 IN,GRADE 5,4 IN LG</stationCUDescription>
                    <stationCUId>CU008</stationCUId>
                    <stationCUType>Bolt</stationCUType>
                    <stationCUQuantityRequired>6</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>4</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313221</stationCUstockNumber>
                    <stationCUDescription>NUT,HEX,3/4 IN,GRADE 5</stationCUDescription>
                    <stationCUId>CU009</stationCUId>
                    <stationCUType>Nut</stationCUType>
                    <stationCUQuantityRequired>6</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>4</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313228</stationCUstockNumber>
                    <stationCUDescription>WASHER,FLAT,3/4 IN,GRADE 5</stationCUDescription>
                    <stationCUId>CU010</stationCUId>
                    <stationCUType>Washer</stationCUType>
                    <stationCUQuantityRequired>12</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>8</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313235</stationCUstockNumber>
                    <stationCUDescription>PAINT,PRIMER,RUST INHIBITOR,GALV</stationCUDescription>
                    <stationCUId>CU011</stationCUId>
                    <stationCUType>Paint</stationCUType>
                    <stationCUQuantityRequired>1</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>0</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
            </stationCUs>
        </station>   
        <station>
            <stationId>STN003</stationId>
            <stationName>Transformer Installation Site</stationName>
            <location>East Field</location>
            <status>Complete</status>
            <checkedOutByName></checkedOutByName>
            <checkedOutByID></checkedOutByID>
            <stationCUs>
                <stationCU>
                    <stationCUstockNumber>2313300</stationCUstockNumber>
                    <stationCUDescription>TRANSFORMER,PAD MOUNT,75 KVA,12.47 KV</stationCUDescription>
                    <stationCUId>CU012</stationCUId>
                    <stationCUType>Transformer</stationCUType>
                    <stationCUQuantityRequired>1</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>1</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313307</stationCUstockNumber>
                    <stationCUDescription>PAD,CONCRETE,TRANSFORMER,6X6 FT</stationCUDescription>
                    <stationCUId>CU013</stationCUId>
                    <stationCUType>Pad</stationCUType>
                    <stationCUQuantityRequired>1</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>1</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313314</stationCUstockNumber>
                    <stationCUDescription>CABLE,PRIMARY,15 KV,1/C,500 KCMIL</stationCUDescription>
                    <stationCUId>CU014</stationCUId>
                    <stationCUType>Cable</stationCUType>
                    <stationCUQuantityRequired>50</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>45</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313321</stationCUstockNumber>
                    <stationCUDescription>TERMINATION,15 KV,500 KCMIL,COLD SHRINK</stationCUDescription>
                    <stationCUId>CU015</stationCUId>
                    <stationCUType>Termination</stationCUType>
                    <stationCUQuantityRequired>2</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>1</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313328</stationCUstockNumber>
                    <stationCUDescription>GROUND ROD,COPPER,8 FT,5/8 IN</stationCUDescription>
                    <stationCUId>CU016</stationCUId>
                    <stationCUType>Ground Rod</stationCUType>
                    <stationCUQuantityRequired>2</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>2</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313335</stationCUstockNumber>
                    <stationCUDescription>WIRE,GROUND,COPPER,4/0 AWG</stationCUDescription>
                    <stationCUId>CU017</stationCUId>
                    <stationCUType>Wire</stationCUType>
                    <stationCUQuantityRequired>20</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>18</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313342</stationCUstockNumber>
                    <stationCUDescription>CLAMP,GROUND,4/0 AWG,COPPER</stationCUDescription>
                    <stationCUId>CU018</stationCUId>
                    <stationCUType>Clamp</stationCUType>
                    <stationCUQuantityRequired>4</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>3</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
            </stationCUs>
        </station>
        <station>
            <stationId>STN004</stationId>
            <stationName>Switchgear Installation Site</stationName>
            <location>West Field</location>
            <status>Open</status>
            <checkedOutByName></checkedOutByName>
            <checkedOutByID></checkedOutByID>
            <stationCUs>
                <stationCU>
                    <stationCUstockNumber>2313400</stationCUstockNumber>
                    <stationCUDescription>SWITCHGEAR,METAL CLAD,15 KV,1200A</stationCUDescription>
                    <stationCUId>CU019</stationCUId>
                    <stationCUType>Switchgear</stationCUType>
                    <stationCUQuantityRequired>1</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>0</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313407</stationCUstockNumber>
                    <stationCUDescription>BREAKER,VACUUM,15 KV,1200A</stationCUDescription>
                    <stationCUId>CU020</stationCUId>
                    <stationCUType>Breaker</stationCUType>
                    <stationCUQuantityRequired>3</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>2</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313414</stationCUstockNumber>
                    <stationCUDescription>RELAY,PROTECTION,OVER CURRENT</stationCUDescription>
                    <stationCUId>CU021</stationCUId>
                    <stationCUType>Relay</stationCUType>
                    <stationCUQuantityRequired>3</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>1</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313421</stationCUstockNumber>
                    <stationCUDescription>CT,CURRENT,15 KV,1200:5</stationCUDescription>
                    <stationCUId>CU022</stationCUId>
                    <stationCUType>Current Transformer</stationCUType>
                    <stationCUQuantityRequired>6</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>4</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313428</stationCUstockNumber>
                    <stationCUDescription>PT,VOLTAGE,15 KV,120:1</stationCUDescription>
                    <stationCUId>CU023</stationCUId>
                    <stationCUType>Voltage Transformer</stationCUType>
                    <stationCUQuantityRequired>3</stationCUQuantityRequired>
                    <stationCUQuantityInstalled>2</stationCUQuantityInstalled>
                    <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                    <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313435</stationCUstockNumber>
                    <stationCUDescription>WIRE,CONTROL,18 AWG,SHIELDED</stationCUDescription>
                     <stationCUId>CU024</stationCUId>
                     <stationCUType>Wire</stationCUType>
                     <stationCUQuantityRequired>500</stationCUQuantityRequired>
                     <stationCUQuantityInstalled>350</stationCUQuantityInstalled>
                     <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                     <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313442</stationCUstockNumber>
                    <stationCUDescription>CONDUIT,EMT,1 IN,10 FT</stationCUDescription>
                    <stationCUId>CU025</stationCUId>
                     <stationCUType>Conduit</stationCUType>
                     <stationCUQuantityRequired>20</stationCUQuantityRequired>
                     <stationCUQuantityInstalled>15</stationCUQuantityInstalled>
                     <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                     <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
                <stationCU>
                    <stationCUstockNumber>2313449</stationCUstockNumber>
                    <stationCUDescription>FITTING,CONDUIT,1 IN,90 DEG</stationCUDescription>
                     <stationCUId>CU026</stationCUId>
                     <stationCUType>Fitting</stationCUType>
                     <stationCUQuantityRequired>40</stationCUQuantityRequired>
                     <stationCUQuantityInstalled>30</stationCUQuantityInstalled>
                     <stationCUPlannedDisposition>Install</stationCUPlannedDisposition>
                     <stationCUMaterialWasNotUsed>false</stationCUMaterialWasNotUsed>
                </stationCU>
            </stationCUs>
        </station>
    </stations>
</activity>`;

// PreValidatedCU data array
const preValidatedCUData = [
    {
        preValidatedCUstockNumber: "1001243",
        preValidatedCUDescription: "ARRESTER,LIGHTNING,36KV, 29KV MCOV,29KV MOV,INTR,P+"
    },
    {
        preValidatedCUstockNumber: "1201152",
        preValidatedCUDescription: "CONDUIT,NM,DB-120,3 IN,20 FT LG,90 DEG C,GRAY PVC"
    },
    {
        preValidatedCUstockNumber: "1201335",
        preValidatedCUDescription: "CONDUIT,NM,EB-35,5 IN,20 FT LG,90 DEG C,GRAY PVC,C+"
    },
    {
        preValidatedCUstockNumber: "1201336",
        preValidatedCUDescription: "CONDUIT,NM,EB-35,5 IN,10 FT LG,90 DEG C,GRAY PVC,C+"
    },
    {
        preValidatedCUstockNumber: "1206106",
        preValidatedCUDescription: "BOX,NM,CABLE,APPROX 10 IN X 14 IN X 12 IN DP"
    },
    {
        preValidatedCUstockNumber: "1206192",
        preValidatedCUDescription: "RISER,NM,VAULT,42 WD X 66 LGH X 6 HI IN,PRECAST CO+"
    },
    {
        preValidatedCUstockNumber: "1206194",
        preValidatedCUDescription: "ADAPTER,BASE,SWITCHGEAR"
    },
    {
        preValidatedCUstockNumber: "1804113",
        preValidatedCUDescription: "CABLE,GROUND,4/0,YELLOW NEOPRENE COVERED"
    },
    {
        preValidatedCUstockNumber: "1805005",
        preValidatedCUDescription: "WIRE,ELEC,4 AWG,ACSR,7/1 STR,SWANATE,900 FT COIL"
    },
    {
        preValidatedCUstockNumber: "1805148",
        preValidatedCUDescription: "WIRE,ELEC,BARE,954 KCMIL,ACSS,54/7 STR,CARDINAL AC+"
    },
    {
        preValidatedCUstockNumber: "1807027",
        preValidatedCUDescription: "CABLE,ELEC PWR,NETWORK, 600V,(3) 4/0 AWG CU,XLP"
    },
    {
        preValidatedCUstockNumber: "1814169",
        preValidatedCUDescription: "CABLE,ELEC CNTRL"
    },
    {
        preValidatedCUstockNumber: "1814170",
        preValidatedCUDescription: "CABLE,ELEC CNTRL"
    },
    {
        preValidatedCUstockNumber: "1816285",
        preValidatedCUDescription: "CABLE,FIBER OPTIC,ADSS 48CT SM,3600 FT,ALL DIELECT+"
    },
    {
        preValidatedCUstockNumber: "2313112",
        preValidatedCUDescription: "ADAPTER,NM,GUY WIRE"
    },
    {
        preValidatedCUstockNumber: "2317354",
        preValidatedCUDescription: "MOUNT,CLUSTER"
    },
    {
        preValidatedCUstockNumber: "2317417",
        preValidatedCUDescription: "COVER,NM,TERMINATION,4 IN X 13 IN,POLYETHYLENE,CLA+"
    },
    {
        preValidatedCUstockNumber: "2317419",
        preValidatedCUDescription: "MOUNTING,NM,PRIMARY METERING PLATFORM,34&69KV,ALUM+"
    },
    {
        preValidatedCUstockNumber: "2318202",
        preValidatedCUDescription: "GUARD,NM,CNDT,5 IN X 9 FT LGH,GALV STL old desc=Y"
    },
    {
        preValidatedCUstockNumber: "3801534",
        preValidatedCUDescription: "LUMINAIRE,OPEN BOTTOM,HPS,100W,120V,1-1/4 IN SIDE"
    },
    {
        preValidatedCUstockNumber: "3801541",
        preValidatedCUDescription: "LUMINAIRE,FLOODLIGHT,MH,1000W,7X6,120V"
    },
    {
        preValidatedCUstockNumber: "3801599",
        preValidatedCUDescription: "POLE,LIGHT,ST,33 FT,PRESTRESSED CONCRETE,SMOOTH,OC+"
    },
    {
        preValidatedCUstockNumber: "4101008",
        preValidatedCUDescription: "CROSSARM,POLE,3-1/2 X 4-1/2 IN,10 FT,DOUGLAS FIR,T+"
    },
    {
        preValidatedCUstockNumber: "4101009",
        preValidatedCUDescription: "CROSSARM,POLE,3-3/4 X 5-3/4 IN,14 FT,DOUGLAS FIR,T+"
    },
    {
        preValidatedCUstockNumber: "4101022",
        preValidatedCUDescription: "CROSSARM,POLE,3-3/4 X 4-3/4 IN,10 FT,DOUGLAS FIR,T+"
    },
    {
        preValidatedCUstockNumber: "4102351",
        preValidatedCUDescription: "POLE,POWER,WOOD,35 FT,1,SYP,TREATED"
    },
    {
        preValidatedCUstockNumber: "4102401",
        preValidatedCUDescription: "POLE,POWER,WOOD,40 FT,1,SYP,TREATED"
    },
    {
        preValidatedCUstockNumber: "4102551",
        preValidatedCUDescription: "POLE,POWER,WOOD,55 FT,1,SYP,TREATED"
    },
    {
        preValidatedCUstockNumber: "4102751",
        preValidatedCUDescription: "POLE,POWER,WOOD,75 FT,1,SYP,TREATED"
    },
    {
        preValidatedCUstockNumber: "4142076",
        preValidatedCUDescription: "POLE,POWER,WOOD,90 FT,H1,DF"
    },
    {
        preValidatedCUstockNumber: "4142078",
        preValidatedCUDescription: "POLE,POWER,WOOD,75 FT,H1,DF"
    },
    {
        preValidatedCUstockNumber: "4142090",
        preValidatedCUDescription: "POLE,POWER,WOOD,85 FT,H2,DF"
    },
    {
        preValidatedCUstockNumber: "4142091",
        preValidatedCUDescription: "POLE,POWER,WOOD,105 FT,H2,DF"
    },
    {
        preValidatedCUstockNumber: "4142094",
        preValidatedCUDescription: "POLE,POWER,WOOD,80 FT,H2,DF"
    },
    {
        preValidatedCUstockNumber: "4142095",
        preValidatedCUDescription: "POLE,POWER,WOOD,90 FT,H2,DF,TREATED"
    },
    {
        preValidatedCUstockNumber: "4145923",
        preValidatedCUDescription: "POLE,POWER,COMPOSITE,45 FT,FBRGL,UV PROTECTED,RND"
    },
    {
        preValidatedCUstockNumber: "4150012",
        preValidatedCUDescription: "POLE,POWER,COMPOSITE,50 FT,FBRGL,UV PROTECTED,UNIF+"
    },
    {
        preValidatedCUstockNumber: "4170732",
        preValidatedCUDescription: "POLE,FIBERGLASS,PWR DIST,70 FT OAL,DIRECT EMBEDDED+"
    },
    {
        preValidatedCUstockNumber: "4170826",
        preValidatedCUDescription: "POLE,POWER,COMPOSITE,70 FT,FBRGL,UV PROTECTED,RND +"
    },
    {
        preValidatedCUstockNumber: "5407198",
        preValidatedCUDescription: "FUSEHOLDER,NO MODIFIER,CUTOUT,27 KV,100 A"
    },
    {
        preValidatedCUstockNumber: "5407202",
        preValidatedCUDescription: "SWITCHGEAR,NM,SECTIONALIZING CMPT,14.4KV 600A,95  old desc=Y"
    },
    {
        preValidatedCUstockNumber: "5407247",
        preValidatedCUDescription: "CUTOUT,FUSED,OPEN DROP OUT,400 A,7.2 KV"
    },
    {
        preValidatedCUstockNumber: "5408329",
        preValidatedCUDescription: "KIT,NM,SW TERMINAL POLE,GALV STL"
    },
    {
        preValidatedCUstockNumber: "5408396",
        preValidatedCUDescription: "SW LB 600A35KV UNITIZ"
    },
    {
        preValidatedCUstockNumber: "5408416",
        preValidatedCUDescription: "OPERATOR,SWITCH,ABRK,34KV 2-SPEED,METAL CABINET,12+"
    },
    {
        preValidatedCUstockNumber: "5408418",
        preValidatedCUDescription: "INTERRUPTER,NM,JOSLYN VACUUM LBRK,34.5KV 1.2KA,RH +"
    },
    {
        preValidatedCUstockNumber: "6911027",
        preValidatedCUDescription: "SWITCH,NM,OIL,14.4KV 200A,SPST,1NC"
    },
    {
        preValidatedCUstockNumber: "6911029",
        preValidatedCUDescription: "CAPACITOR,POWER,7.2KV,50 KVAR,(2)"
    },
    {
        preValidatedCUstockNumber: "6911043",
        preValidatedCUDescription: "CAPACITOR,POWER,7.2KV,100 KVAR,(1) S"
    },
    {
        preValidatedCUstockNumber: "6911060",
        preValidatedCUDescription: "CAPACITOR,POWER,2.4KVAC 60HZ,200 KVAR,(1) S"
    },
    {
        preValidatedCUstockNumber: "6911298",
        preValidatedCUDescription: "SENSOR,NM,NEUT CRNT"
    },
    {
        preValidatedCUstockNumber: "6911299",
        preValidatedCUDescription: "CONTROL,NM,CAPACITOR"
    },
    {
        preValidatedCUstockNumber: "6911300",
        preValidatedCUDescription: "CONTROL,NM,CAPACITOR TIME, TEMP, V"
    },
    {
        preValidatedCUstockNumber: "BA0075F",
        preValidatedCUDescription: "TRANSFORMER,POLE,75 KVA,2400/4160Y V,120/240 V,1,C+"
    },
    {
        preValidatedCUstockNumber: "BA0167F",
        preValidatedCUDescription: "TRANSFORMER,POLE,167 KVA,2400/4160Y V,120/240 V,1"
    },
    {
        preValidatedCUstockNumber: "BM0050G",
        preValidatedCUDescription: "TRANSFORMER,POLE,50 KVA,2400/4160Y V,7200/12470Y V"
    },
    {
        preValidatedCUstockNumber: "EC0500M",
        preValidatedCUDescription: "TRANSFORMER,PAD,500 KVA,4160 DELTA V,208Y/120 V,3"
    },
    {
        preValidatedCUstockNumber: "EC0500Z",
        preValidatedCUDescription: "TRANSFORMER,PAD,500 KVA,4160 V,208Y/120 V,3,RADL F+"
    },
    {
        preValidatedCUstockNumber: "EF0750Z",
        preValidatedCUDescription: "TRANSFORMER,PAD,750 KVA,4160 V,480Y/277 V,3,RADL F+"
    },
    {
        preValidatedCUstockNumber: "EF1000M",
        preValidatedCUDescription: "TRANSFORMER,PAD,1000 KVA,4160 DELTA V,480Y/277 V,3"
    },
    {
        preValidatedCUstockNumber: "JA0167F",
        preValidatedCUDescription: "TRANSFORMER,POLE,167 KVA,7200/12470Y V,120/240 V,1"
    },
    {
        preValidatedCUstockNumber: "1001008",
        preValidatedCUDescription: "ARRESTER,LIGHTNING,12KV,DIST,METAL OXIDE"
    },
    {
        preValidatedCUstockNumber: "1201297",
        preValidatedCUDescription: "CONDUIT,NM,5 IN,20 LG,SCH 40,90 DEG-C,GRAY PVC,COU+"
    },
    {
        preValidatedCUstockNumber: "1201298",
        preValidatedCUDescription: "CONDUIT,NM,1-1/2 IN,20 LG,SCH 40,90 DEG-C,GRAY PVC+"
    },
    {
        preValidatedCUstockNumber: "1805007",
        preValidatedCUDescription: "WIRE,ELEC,2 AWG,ACSR,7/1 STR,SPARATE,940 FT COIL"
    },
    {
        preValidatedCUstockNumber: "1805040",
        preValidatedCUDescription: "CABLE,ELEC,OH,TRPLX,2 AAC, 2 AAC MSGR,CLAM,300 FT +"
    },
    {
        preValidatedCUstockNumber: "1805048",
        preValidatedCUDescription: "CABLE,ELEC,OH,DPLX,6AWG,ACSR MSGR,SHEPHERD,600 FT +"
    },
    {
        preValidatedCUstockNumber: "1805052",
        preValidatedCUDescription: "WIRE,ELEC,336.4 KCMIL,AAC,19 STR,XLP,ANONA,2500 FT+"
    },
    {
        preValidatedCUstockNumber: "1805104",
        preValidatedCUDescription: "CABLE,ELEC,OH,QPLX,1/0 AAC, 1/0 AAC MSGR,XLP,CRIOL+"
    },
    {
        preValidatedCUstockNumber: "1805145",
        preValidatedCUDescription: "WIRE,ELEC,336.4 KCMIL,ACSR,18/1 STR,MERLIN,11390 F+"
    },
    {
        preValidatedCUstockNumber: "2313094",
        preValidatedCUDescription: "ANCHOR,GUY,BUST EXPANSION,12 IN,1 IN"
    },
    {
        preValidatedCUstockNumber: "2317294",
        preValidatedCUDescription: "MOUNTING,NM,PRI METERING CLUSTER UN"
    },
    {
        preValidatedCUstockNumber: "2317415",
        preValidatedCUDescription: "COVER,NM,INSR/COND,2 IN X 36 FT,SILICON RUBBER,MED+"
    },
    {
        preValidatedCUstockNumber: "2709082",
        preValidatedCUDescription: "WIRE,ELEC,MISC,#6A,COPPERWELD CU,STR,200 FT"
    },
    {
        preValidatedCUstockNumber: "2759080",
        preValidatedCUDescription: "WIRE,ELEC,TRANS,48-CT,DNO-7330,OPGW/AW,BARE,CC-68/+"
    },
    {
        preValidatedCUstockNumber: "3801542",
        preValidatedCUDescription: "LUMINAIRE,FLOODLIGHT,MH-PROBE,400W,7X6,120V"
    },
    {
        preValidatedCUstockNumber: "3851616",
        preValidatedCUDescription: "LUMINAIRE,HORIZONTAL,LED 400 WATT EQUIVALENT BRACK+"
    },
    {
        preValidatedCUstockNumber: "3851631",
        preValidatedCUDescription: "LUMINAIRE,POST TOP,COLONIAL,LED,44W,TYPE V,120/208+"
    },
    {
        preValidatedCUstockNumber: "3851632",
        preValidatedCUDescription: "LUMINAIRE,POST TOP,COLONIAL,LED,44W,TYPE III,120/2+"
    },
    {
        preValidatedCUstockNumber: "3851633",
        preValidatedCUDescription: "LUMINAIRE,POST TOP,ASPEN,LED,37W,TYPE III,120/208/+"
    },
    {
        preValidatedCUstockNumber: "4102601",
        preValidatedCUDescription: "POLE,POWER,WOOD,60 FT,1,SYP,TREATED"
    },
    {
        preValidatedCUstockNumber: "4102603",
        preValidatedCUDescription: "POLE,POWER,WOOD,60 FT,3,SYP,TREATED"
    },
    {
        preValidatedCUstockNumber: "4142223",
        preValidatedCUDescription: "POLE,POWER,WOOD,90 FT,H4,DF"
    },
    {
        preValidatedCUstockNumber: "4142226",
        preValidatedCUDescription: "POLE,POWER,WOOD,95 FT,H5,DF OR SYP,TREATED"
    },
    {
        preValidatedCUstockNumber: "4142228",
        preValidatedCUDescription: "POLE,POWER,WOOD,100 FT,H4,DF"
    },
    {
        preValidatedCUstockNumber: "4170015",
        preValidatedCUDescription: "POLE,POWER,COMPOSITE,70 FT,FBRGL,UV PROTECTED,RND +"
    },
    {
        preValidatedCUstockNumber: "4170026",
        preValidatedCUDescription: "POLE,POWER,COMPOSITE,70 FT,FBRGL,UV PROTECTED,RND +"
    },
    {
        preValidatedCUstockNumber: "4170729",
        preValidatedCUDescription: "POLE,POWER,COMPOSITE,70 FT,FBRGL,UV PROTECTED,TELE+"
    },
    {
        preValidatedCUstockNumber: "4190832",
        preValidatedCUDescription: "POLE,FIBERGLASS,POWER DISTRIBUTION,90FT,DIRECT EMB+"
    },
    {
        preValidatedCUstockNumber: "4190841",
        preValidatedCUDescription: "POLE,POWER,COMPOSITE,90 FT,FIBERGLASS,UV PROTECTED+"
    },
    {
        preValidatedCUstockNumber: "4752081",
        preValidatedCUDescription: "FITTING,BUS SUPPORT,CU,1-1/2 IPS IN,3 IN"
    },
    {
        preValidatedCUstockNumber: "5403051",
        preValidatedCUDescription: "MOUNTING,FUSE,SM5, OUTDR,7.2,400E A"
    },
    {
        preValidatedCUstockNumber: "5407209",
        preValidatedCUDescription: "SWITCH,DISCONNECT,FUSED,15KV 200A 12KA INTERRUPTIN+"
    },
    {
        preValidatedCUstockNumber: "6910142",
        preValidatedCUDescription: "RECLOSER,NM,VACUUM CKT INTERRUPTER,14.4 KV,140 A"
    },
    {
        preValidatedCUstockNumber: "6910269",
        preValidatedCUDescription: "RECLOSER,ELECTRICAL,TRIPSAVER II,200,15KV,100T"
    },
    {
        preValidatedCUstockNumber: "6910270",
        preValidatedCUDescription: "RECLOSER,ELECTRICAL,TRIPSAVER II,200,15KV,140T"
    },
    {
        preValidatedCUstockNumber: "6911031",
        preValidatedCUDescription: "CAPACITOR BANK,PWR,SWITCHED,4.16KV 200A,300 KVAR,(+"
    },
    {
        preValidatedCUstockNumber: "6911194",
        preValidatedCUDescription: "SWITCH,NM,VACUUM,34.5KV 200A,SPST,1NC,BRKT"
    },
    {
        preValidatedCUstockNumber: "BM0250G",
        preValidatedCUDescription: "TRANSFORMER,POLE,250 KVA,2400/4160Y V,7200/12470Y +"
    },
    {
        preValidatedCUstockNumber: "EC0750M",
        preValidatedCUDescription: "TRANSFORMER,PAD,750 KVA,4160 DELTA V,208Y/120 V,3"
    },
    {
        preValidatedCUstockNumber: "EC0750P",
        preValidatedCUDescription: "TRANSFORMER,PLATFORM,750 KVA,4160 DELTA V,208Y/120"
    },
    {
        preValidatedCUstockNumber: "EC0750Z",
        preValidatedCUDescription: "TRANSFORMER,PAD,750 KVA,4160 V,208Y/120 V,3,RADL F+"
    },
    {
        preValidatedCUstockNumber: "EF0030D",
        preValidatedCUDescription: "TRANSFORMER,POLE,30 KVA,4160 DELTA V,480Y/277 V,3"
    },
    {
        preValidatedCUstockNumber: "FR0075X",
        preValidatedCUDescription: "TRANSFORMER,PAD,75 KVA,4160 GRNDY/2400 V,240/120 V+"
    },
    {
        preValidatedCUstockNumber: "KG0030I",
        preValidatedCUDescription: "TRANSFORMER,POLE,30 KVA,12470Y V,240 V,3,SELF-COOL+"
    },
    {
        preValidatedCUstockNumber: "KG0045I",
        preValidatedCUDescription: "TRANSFORMER,POLE,45 KVA,12470Y V,240 V,3,SELF-COOL+"
    },
    {
        preValidatedCUstockNumber: "1201182",
        preValidatedCUDescription: "CONDUIT,NM,EB-20,5 IN,10 FT LG,90 DEG C,GRAY PVC,C+"
    },
    {
        preValidatedCUstockNumber: "1201296",
        preValidatedCUDescription: "CONDUIT,NM,2 IN,20 LG,SCH 40, 90 DEG-C,GRAY PVC,CO+"
    },
    {
        preValidatedCUstockNumber: "1201299",
        preValidatedCUDescription: "END,CONDUIT,P&C TYPE EB,BELL END,5 IN,PVC"
    },
    {
        preValidatedCUstockNumber: "1201303",
        preValidatedCUDescription: "CONDUIT,NM,5 IN,10 FT LG,SCH 40 HVY WALL,PLSTC"
    },
    {
        preValidatedCUstockNumber: "1202084",
        preValidatedCUDescription: "COVER,NM,MANHOLE,24 IN WD X 42 IN LGH,CI"
    },
    {
        preValidatedCUstockNumber: "1202085",
        preValidatedCUDescription: "FRAME,NM,MANHOLE,36 IN WD,CI"
    },
    {
        preValidatedCUstockNumber: "1206134",
        preValidatedCUDescription: "SLEEVE, EARTH, FIBERGLASS GROUND SLEEVE TO SUPPORT"
    },
    {
        preValidatedCUstockNumber: "1705500",
        preValidatedCUDescription: "SPLICE,CONDUCTOR,350-750 KCMIL STR CU OR ALUM,ALUM+"
    },
    {
        preValidatedCUstockNumber: "1801020",
        preValidatedCUDescription: "WIRE,ELEC,2 AWG,CU,SLD,HD,XLP,250 FT COIL"
    },
    {
        preValidatedCUstockNumber: "1805097",
        preValidatedCUDescription: "WIRE,ELEC,BARE,556.5 KCMIL,AAC,19 STR,DAHLIA"
    },
    {
        preValidatedCUstockNumber: "1805113",
        preValidatedCUDescription: "WIRE,ELEC,1/0 AWG,ACSR,6/1 STR,RAVEN,6095 FT REEL"
    },
    {
        preValidatedCUstockNumber: "1807241",
        preValidatedCUDescription: "CABLE,ELEC PWR,UG, 15KV,(1) 4/0 AWG ALUM,2000 FT L+"
    },
    {
        preValidatedCUstockNumber: "1807337",
        preValidatedCUDescription: "CABLE,UNDERGROUND,3-4/0 & 1-2/0,600V"
    },
    {
        preValidatedCUstockNumber: "2313131",
        preValidatedCUDescription: "ANCHOR,GUY,SCREW,10IN"
    },
    {
        preValidatedCUstockNumber: "2317277",
        preValidatedCUDescription: "MOUNTING,NM,PRI METERING CLUSTER UN,ALUM"
    },
    {
        preValidatedCUstockNumber: "2317291",
        preValidatedCUDescription: "BRACKET,NM,MNTG,5-3/4 IN WD X 14-3/4 IN LGH X 6-3/"
    },
    {
        preValidatedCUstockNumber: "2317412",
        preValidatedCUDescription: "COVER,NM,CUTOUT,7 1/4 IN ,POLYETHYLENE,200 AMP,WIL+"
    },
    {
        preValidatedCUstockNumber: "2317413",
        preValidatedCUDescription: "COVER,NM,INSR/COND,0.4 IN X 100 FT,POLYETHYLENE,ME+"
    },
    {
        preValidatedCUstockNumber: "2317416",
        preValidatedCUDescription: "COVER,NM,COND,24 IN LONG,POLYETHYLENE/RUBBER POLYM+"
    },
    {
        preValidatedCUstockNumber: "3801518",
        preValidatedCUDescription: "LUMINAIRE,NM,EARLY AMERICAN,HPS,120 V,100 W,POST T+"
    },
    {
        preValidatedCUstockNumber: "3801530",
        preValidatedCUDescription: "LUMINAIRE,NM,COBRA HEAD,HPS,120 V,400 W,SEMI-CUTOF+"
    },
    {
        preValidatedCUstockNumber: "3801531",
        preValidatedCUDescription: "LUMINAIRE,NM,COBRA HEAD,HPS,120 V,100 W,SEMI-CUTOF+"
    },
    {
        preValidatedCUstockNumber: "3801746",
        preValidatedCUDescription: "BRACKET,NM,UPSWEEP,8FT,AL,W/HARDWARE,30FT&35FT FIB+"
    },
    {
        preValidatedCUstockNumber: "3801962",
        preValidatedCUDescription: "LUMINAIRE,FLOODLIGHT,PMH,400W,6X5,120V"
    },
    {
        preValidatedCUstockNumber: "3801967",
        preValidatedCUDescription: "POLE,FIBERGLASS,ST-LT,35FT,DIRECT EMBEDDED,STD,ROU+"
    },
    {
        preValidatedCUstockNumber: "3801968",
        preValidatedCUDescription: "BRACKET,LIGHTING,UPSWEEP,ALUM,2 IN X 6 FT"
    },
    {
        preValidatedCUstockNumber: "3801970",
        preValidatedCUDescription: "POLE,FIBERGLASS,ST-LT,30FT,DIRECT EMBEDDED,STD,ROU+"
    },
    {
        preValidatedCUstockNumber: "3851615",
        preValidatedCUDescription: "LUMINAIRE,HORIZONTAL,LED 400 WATT EQUIVALENT BRACK+"
    },
    {
        preValidatedCUstockNumber: "3851622",
        preValidatedCUDescription: "LUMINAIRE,POST TOP,EARLY AMERICAN,LED,100W LED EQU+"
    },
    {
        preValidatedCUstockNumber: "3851623",
        preValidatedCUDescription: "LUMINAIRE,POST TOP,CONTEMPORARY,TRADITIONAL,LED,49+"
    },
    {
        preValidatedCUstockNumber: "4101295",
        preValidatedCUDescription: "CROSSARM ASSEMBLY,NM,10 FT DBL DE FBRGL"
    },
    {
        preValidatedCUstockNumber: "4101296",
        preValidatedCUDescription: "ARM,ASSEMBLY,CROSSARM,TANGENT,FIBERGLASS,4 IN X 6 +"
    },
    {
        preValidatedCUstockNumber: "4101301",
        preValidatedCUDescription: "CROSSARM ASSEMBLY,NM,9 FT DBL DE FBRGL"
    },
    {
        preValidatedCUstockNumber: "4102404",
        preValidatedCUDescription: "POLE,POWER,WOOD,40 FT,4,SYP,TREATED"
    },
    {
        preValidatedCUstockNumber: "4102405",
        preValidatedCUDescription: "POLE,POWER,WOOD,40 FT,5,SYP,TREATED"
    },
    {
        preValidatedCUstockNumber: "4102802",
        preValidatedCUDescription: "POLE,POWER,WOOD,80 FT,2,DF,PENTA TREATED"
    },
    {
        preValidatedCUstockNumber: "4102951",
        preValidatedCUDescription: "POLE,POWER,WOOD,95 FT,1,DF,PENTA TREATED"
    },
    {
        preValidatedCUstockNumber: "4142057",
        preValidatedCUDescription: "POLE,POWER,WOOD,90 FT,2,DF"
    },
    {
        preValidatedCUstockNumber: "4160832",
        preValidatedCUDescription: "POLE,FIBERGLASS,POWER DISTRIBUTION,60 FT OVERALL L+"
    },
    {
        preValidatedCUstockNumber: "4160937",
        preValidatedCUDescription: "POLE,POWER,COMPOSITE,60 FT,FBRGL,UV PROTECTED,TELE+"
    },
    {
        preValidatedCUstockNumber: "4165012",
        preValidatedCUDescription: "POLE,POWER,COMPOSITE,65 FT,FBRGL,UV PROTECTED,RND"
    },
    {
        preValidatedCUstockNumber: "4165014",
        preValidatedCUDescription: "POLE,POWER,COMPOSITE,65 FT,FBRGL,UV PROTECTED,RND +"
    },
    {
        preValidatedCUstockNumber: "4170829",
        preValidatedCUDescription: "POLE,POWER,COMPOSITE,70 FT,FBRGL,UV PROTECTED,RND +"
    },
    {
        preValidatedCUstockNumber: "4170832",
        preValidatedCUDescription: "POLE,FIBERGLASS,PWR DIST,70 FT OAL,DIRECT EMBEDDED+"
    },
    {
        preValidatedCUstockNumber: "4170841",
        preValidatedCUDescription: "POLE,POWER,COMPOSITE,FBRGL,UV PROTECTED,RND"
    },
    {
        preValidatedCUstockNumber: "5406046",
        preValidatedCUDescription: "SWITCH,DISCONNECT,FUSED,5KV 100A INTERRUPTING 10/ old desc=Y"
    },
    {
        preValidatedCUstockNumber: "5409368",
        preValidatedCUDescription: "SWITCH,AIRBREAK,SEECO 69KV,1200A,3PH,GRP,POLE, PH-+"
    },
    {
        preValidatedCUstockNumber: "5417512",
        preValidatedCUDescription: "DISCONNECT,NM,SEC,120V KV,30A A,8-TERMINAL"
    },
    {
        preValidatedCUstockNumber: "6910024",
        preValidatedCUDescription: "RECLOSER,NM,14.4 KV,70 A,OIL CKT"
    },
    {
        preValidatedCUstockNumber: "6910091",
        preValidatedCUDescription: "RECLOSER,NM,OIL CKT,14.4 KV,140 A"
    },
    {
        preValidatedCUstockNumber: "6910140",
        preValidatedCUDescription: "RECLOSER,NM,VACUUM CKT INTERRUPTER,14.4 KV,70 A"
    },
    {
        preValidatedCUstockNumber: "7190965",
        preValidatedCUDescription: "KIT,CONTACT,UTT/UTTA TO UTTB LTC SEL SW UPGRADE"
    },
    {
        preValidatedCUstockNumber: "7190966",
        preValidatedCUDescription: "KIT,CONTACT,UTT/UTTA TO UTTB LTC XFR SW UPGRADE"
    },
    {
        preValidatedCUstockNumber: "BA0100F",
        preValidatedCUDescription: "TRANSFORMER,POLE,100 KVA,2400/4160Y V,120/240 V,1"
    },
    {
        preValidatedCUstockNumber: "CA0100G",
        preValidatedCUDescription: "TRANSFORMER,POLE,100 KVA,4160/7200Y V,120/240 V,1"
    },
    {
        preValidatedCUstockNumber: "EC0075D",
        preValidatedCUDescription: "TRANSFORMER,POLE,75 KVA,4160 DELTA V,208Y/120 V,3"
    },
    {
        preValidatedCUstockNumber: "EC0075L",
        preValidatedCUDescription: "TRANSFORMER,PAD,75 KVA,4160 DELTA V,208Y/120 V,3,D+"
    },
    {
        preValidatedCUstockNumber: "EC0075M",
        preValidatedCUDescription: "TRANSFORMER,PAD,75 KVA,4160 DELTA V,208Y/120 V,3,D+"
    },
    {
        preValidatedCUstockNumber: "EC0150L",
        preValidatedCUDescription: "TRANSFORMER,PAD,150 KVA,4160 DELTA V,208Y/120 V,3"
    },
    {
        preValidatedCUstockNumber: "EC0150M",
        preValidatedCUDescription: "TRANSFORMER,PAD,150 KVA,4160 DELTA V,208Y/120 V,3"
    },
    {
        preValidatedCUstockNumber: "EF0045D",
        preValidatedCUDescription: "TRANSFORMER,POLE,45 KVA,4160 DELTA V,480Y/277 V,3"
    },
    {
        preValidatedCUstockNumber: "EF0045F",
        preValidatedCUDescription: "TRANSFORMER,POLE,45 KVA,4160 DELTA V,480Y/277 V,3"
    },
    {
        preValidatedCUstockNumber: "EF0075D",
        preValidatedCUDescription: "TRANSFORMER,POLE,75 KVA,4160 DELTA V,480Y/277 V,3"
    },
    {
        preValidatedCUstockNumber: "EF0075F",
        preValidatedCUDescription: "TRANSFORMER,POLE,75 KVA,4160 DELTA V,480Y/277 V,3"
    },
    {
        preValidatedCUstockNumber: "EF0500M",
        preValidatedCUDescription: "TRANSFORMER,PAD,500 KVA,4160 DELTA V,480Y/277 V,3"
    },
    {
        preValidatedCUstockNumber: "EF0500P",
        preValidatedCUDescription: "TRANSFORMER,PLATFORM,500 KVA,4160 DELTA V,480Y/277"
    },
    {
        preValidatedCUstockNumber: "EF0500Z",
        preValidatedCUDescription: "TRANSFORMER,PAD,500 KVA,4160 V,480Y/277 V,3,RADL F+"
    },
    {
        preValidatedCUstockNumber: "1001032",
        preValidatedCUDescription: "ARRESTER,LIGHTNING,175V,SEC,METAL OXIDE"
    },
    {
        preValidatedCUstockNumber: "1001129",
        preValidatedCUDescription: "ARRESTER,LIGHTNING,9KV,RISER POLE,HDY,METAL OXIDE"
    },
    {
        preValidatedCUstockNumber: "1001133",
        preValidatedCUDescription: "ARRESTER,LIGHTNING,3KV,DIST,METAL OXIDE"
    },
    {
        preValidatedCUstockNumber: "1201279",
        preValidatedCUDescription: "CONDUIT,NM,3 IN,10 FT LG,90 DEG C,GRAY PVC,COUPLED+"
    },
    {
        preValidatedCUstockNumber: "1201281",
        preValidatedCUDescription: "DUCT,NM,COILABLE,4 IN DIA X 1200 FT LGH,HDPE"
    },
    {
        preValidatedCUstockNumber: "1201282",
        preValidatedCUDescription: "DUCT,NM,COILABLE,1-1/2 IN X 3000 FT LGH,HDPE"
    },
    {
        preValidatedCUstockNumber: "1206124",
        preValidatedCUDescription: "PAD,NM,XFMR,84 WD X 72 DP X 4 TO 5 THK IN,FBRGL CO+"
    },
    {
        preValidatedCUstockNumber: "1206210",
        preValidatedCUDescription: "WALL,NM,RETAINING-LONG SIDE WALL,44-3/4 IN LGH X 1+"
    },
    {
        preValidatedCUstockNumber: "1206212",
        preValidatedCUDescription: "WALL,NM,RETAINING-SHORT SIDE WALL,43-1/2 IN LGH X +"
    },
    {
        preValidatedCUstockNumber: "1206213",
        preValidatedCUDescription: "WALL,NM,RETAINING-BACK WALL,57-1/2 IN WD X 18 IN H+"
    },
    {
        preValidatedCUstockNumber: "1206214",
        preValidatedCUDescription: "LID,NM,VAULT,3 FT X 5 FT,FIBERCRETE"
    },
    {
        preValidatedCUstockNumber: "1206215",
        preValidatedCUDescription: "VAULT,NM,BOX,42 IN WD X 48 IN LGH X 32 IN HI,FBRGL"
    },
    {
        preValidatedCUstockNumber: "1206231",
        preValidatedCUDescription: "MANHOLE,TOP,TRAFFIC RATED,4 X 10,PRECAST,CONCRETE"
    },
    {
        preValidatedCUstockNumber: "1206232",
        preValidatedCUDescription: "MANHOLE,BOTTOM,TRAFFIC RATED,4 X 10,PRECAST,CONCRE+"
    },
    {
        preValidatedCUstockNumber: "1206233",
        preValidatedCUDescription: "MANHOLE,TOP,TRAFFIC RATED,6 X 14,PRECAST,CONCRETE"
    },
    {
        preValidatedCUstockNumber: "1206234",
        preValidatedCUDescription: "MANHOLE,BOTTOM,TRAFFIC RATED,6 X 14,PRECAST,CONCRE+"
    },
    {
        preValidatedCUstockNumber: "1801017",
        preValidatedCUDescription: "WIRE,ELEC,4 AWG,CU,SLD,HD,XLP,396 FT COIL"
    },
    {
        preValidatedCUstockNumber: "1801025",
        preValidatedCUDescription: "WIRE,ELEC,4/0 AWG,CU,7 STR HD,XLP,500 FT REEL"
    },
    {
        preValidatedCUstockNumber: "1805010",
        preValidatedCUDescription: "WIRE,ELEC,3/0 AWG,ACSR,6/1 STR,PIGEON,440 FT COIL"
    },
    {
        preValidatedCUstockNumber: "1805011",
        preValidatedCUDescription: "WIRE,ELEC,BARE,4/0 AWG,ACSR,6/1 STR,PENGUIN,400 FT+"
    },
    {
        preValidatedCUstockNumber: "1807275",
        preValidatedCUDescription: "CABLE,ELEC PWR,UG, 600V,(1) 500 KCMIL CU,XLP"
    },
    {
        preValidatedCUstockNumber: "1811065",
        preValidatedCUDescription: "CORD,NM,HARD SRV SEOOW ,14 AWG,TPLSTC,NO TERMINATI+"
    },
    {
        preValidatedCUstockNumber: "1812019",
        preValidatedCUDescription: "BUS,ELECTRICAL,FLAT BAR,1/4 IN THK X 4 IN WD X 12"
    },
    {
        preValidatedCUstockNumber: "1866658",
        preValidatedCUDescription: "CABLE,FIBER OPTIC,FAULT IND,1 FIBER, 6 FT LONG"
    },
    {
        preValidatedCUstockNumber: "2313001",
        preValidatedCUDescription: "ANCHOR,GUY,SCREW,4 IN,3/4 IN X 54 IN"
    },
    {
        preValidatedCUstockNumber: "2313056",
        preValidatedCUDescription: "ANCHOR,GUY,ROCK EXPANSION,1-3/4 IN,3/4 IN X 96 IN"
    },
    {
        preValidatedCUstockNumber: "2313138",
        preValidatedCUDescription: "ANCHOR,POLE,SQ SHFT,TRIPLE,10-12-14 IN,TRIPLE,GALV"
    }
];

// Export the data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { embeddedXMLData, preValidatedCUData };
}
