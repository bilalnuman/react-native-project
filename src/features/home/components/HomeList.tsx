



import { Dropdown } from '@shared/Dropdown';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { DataTable, Column } from 'react-native-smart-data-table';

interface UserRow {
    id: number;
    image: string,
    name: string;
    age: number;
    dob: string;
    address: string;
    email: string;
    description: string;
}


const columns: Column[] = [
    { key: 'id', title: 'ID', sortable: true },
    { key: '__image', title: 'Image' },
    { key: 'name', title: 'Name', sortable: true, width: 150 },
    { key: 'age', title: 'Age', sortable: true, },
    { key: 'dob', title: 'DOB', sortable: true, width: 130 },
    { key: 'address', title: 'Address', sortable: false, width: 100 },
    { key: 'email', title: 'Email', sortable: false, width: 200 },
    { key: 'description', title: 'Description', sortable: false, width: 200, numberOfLines: 2 },
    { key: '__actions', title: 'Actions', align: 'right', width: 100, },
];


const data: UserRow[] = [
    { id: 1, image: "https://watchlytics.s3.eu-west-2.amazonaws.com/static/images/bird-thumbnail_jOblOE2.jpg", name: 'Muhammad Bilal', age: 24, dob: '1999-04-15', address: '123 Main', email: 'bilal.kalri@gmail.com', description: "description" },
    {
        id: 2, image: "https://watchlytics.s3.eu-west-2.amazonaws.com/static/images/bird-thumbnail_jOblOE2.jpg", name: 'Bob', age: 30, dob: '1995-08-22', address: '456 Elm', email: 'bob@x.com', description: `Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor`
    },
]

const arrow = (dir: 'asc' | 'desc' | undefined) => {
    if (dir === 'asc') return <Text style={{ marginLeft: 4 }}>🔼</Text>;
    if (dir === 'desc') return <Text style={{ marginLeft: 4 }}>🔽</Text>;
    return null;
};



const renderCell = (row: UserRow, column: Column) => {
    if (column.key === '__image') {
        return (
            <Image
                source={{ uri: row.image }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
                resizeMode="cover"
            />
        );
    }
    if (column.key === '__actions') {
        return (
            <View style={{ flexDirection: 'row', gap: 8, }}>
                <TouchableOpacity onPress={() => console.log('Edit', row.id)}>
                    <Text style={{ color: '#1a73e8' }}>Edit
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Delete', row.id)}>
                    <Text style={{ color: '#d93025' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return undefined;
};



const HomeTable = () => {
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<string | undefined>();
    const [fruit, setFruit] = useState<string>("");
    const [selectedFruits, setSelectedFruits] = useState<string[]>([]);
    useEffect(() => {
        // Simulate fetching data
        // console.log('Fetching data for page:', selectedFruits);
    }, [selectedFruits]);
    return (
        <>
            <View style={{ padding: 20 }}>
                <Dropdown
                    value={fruit}
                    items={[
                        { label: 'Apple', value: 'apple' },
                        { label: 'Banana', value: 'banana' },
                        { label: 'Orange', value: 'orange' },
                    ]}
                    onChange={(val) => setFruit(val as string)}
                    placeholder="Select a fruit"
                />
            </View>
            <View style={{ padding: 20 }}>
                <Dropdown
                    items={[
                        { label: 'Apple', value: 'apple' },
                        { label: 'Banana', value: 'banana' },
                        { label: 'Orange', value: 'orange' },
                    ]}
                    value={selectedFruits}
                    onChange={(val) => setSelectedFruits(val as string[])}
                    getRemovedItem={(val) => console.log('Removed item:', val)}
                    multiple
                    placeholder="Select fruits"
                />
            </View>

            {/* <View style={{ padding: 16 }}>
                <Dropdown
                    items={options}
                    value={selected}
                    onChange={setSelected}
                    // placeholder="Select a fruit"
                />
            </View> */}

            <View style={styles.container}>
                <DataTable<UserRow>
                    data={data}
                    columns={columns}
                    isCheckBox
                    sortIcon={arrow}
                    renderCell={renderCell}
                    pagination={true}
                    totalPages={23}
                    onPageChange={(page) => setPage(page)}
                    onSelectionChange={(val) => console.log(val)}
                    page={page}
                    searchAble
                />
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: { marginTop: 30, flex: 1, marginBottom: 30, backgroundColor: '#fff', margin: "auto", borderRadius: 5 },
});

export default HomeTable;
