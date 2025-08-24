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

// PreValidatedCU data array (abbreviated for brevity)
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
    }
];

// Export the data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { embeddedXMLData, preValidatedCUData };
}
