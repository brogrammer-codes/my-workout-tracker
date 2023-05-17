import React from 'react'
import {
  Card,
  CardBody,
  CardHeader, 
  Text,
  Heading
} from '@chakra-ui/react'
import moment from 'moment';
import { dateFormatMonthDayTime } from '@/utils/formats';

export const PlanCard = ({plan, loading, onClick}) => {
  return (
    <Card bg={loading ? 'brand.150' : 'brand.50'} height={'100%'} onClick={() => !loading && onClick(plan?.id)} cursor={!loading && 'pointer'}>
      <CardHeader ><Heading>{plan.name}</Heading></CardHeader>
      <CardBody>
        <Text>{plan?.description}</Text>
        <Text>Created on: {moment(plan?.inserted_at).format(dateFormatMonthDayTime)}</Text>
      </CardBody>
    </Card>
  )
}
