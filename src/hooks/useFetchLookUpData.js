// react imports
import { useState, useEffect } from "react";

// redux imports
import {
  useGetLookupDataQuery,
  useGetPensionaryStatusQuery,
  useGetRelationshipQuery,
  useGetRetiredOrganizationQuery,
  useGetRetirementStatementTypeQuery,
} from "../slices/sharedApiSlice.js";
import { useGetRequestTypeQuery } from "../slices/requestApiSlice";

// COMMON LOOK UP DATA LOGIC
/**
 * Custom hook to fetch lookup data based on the specified type.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {string} params.lookUpType - The type of lookup data to fetch.
 *
 * @returns {Object} An object containing the following properties:
 * - `lookUpItems` {Array}: The list of fetched lookup items.
 * - `lookUpItemsIsLoading` {boolean}: A flag indicating if the data is currently loading.
 * - `lookUpItemsIsFetching` {boolean}: A flag indicating if the data is being fetched.
 */
const useFetchLookUpData = ({ lookUpType }) => {
  const [lookUpItems, setLookUpItems] = useState([]);

  // GET DATA
  const {
    data: lookUpItemsData,
    isSuccess: lookUpItemsIsSuccess,
    isLoading: lookUpItemsIsLoading,
    isFetching: lookUpItemsIsFetching,
    error: lookUpItemsError,
  } = useGetLookupDataQuery({ lookUpType });

  // FETCH DATA
  useEffect(() => {
    if (lookUpItemsIsSuccess) {
      setLookUpItems(lookUpItemsData.itemList);
    }
  }, [lookUpItemsIsSuccess, lookUpItemsData]);

  // HANDLE ERROR
  useEffect(() => {
    if (lookUpItemsError) {
      console.log(lookUpItemsError);
    }
  }, [lookUpItemsError]);

  return {
    lookUpItems,
    lookUpItemsIsLoading,
    lookUpItemsIsFetching,
  };
};

// STATEMENT TYPES LOOK UP LOGIC
const useFetchRetirementStatementTypes = () => {
  const [statementTypes, setStatementTypes] = useState([]);

  // GET DATA
  const {
    data: statementTypesItems,
    isSuccess: statementTypesIsSuccess,
    isFetching: statementTypesIsFetching,
    isLoading: statementTypesIsLoading,
    error: statementTypesError,
  } = useGetRetirementStatementTypeQuery({});

  // FETCH DATA
  useEffect(() => {
    if (statementTypesIsSuccess) {
      setStatementTypes(statementTypesItems.itemList);
    }
  }, [statementTypesIsSuccess, statementTypesItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (statementTypesError) {
      console.log(statementTypesError);
    }
  }, [statementTypesError]);

  return {
    statementTypes,
    statementTypesIsFetching,
    statementTypesIsLoading,
  };
};

// PENSIONARY STATUS LOOK UP LOGIC
const useFetchPensionaryStatus = ({
  pensionaryStatusCategory,
  pensionaryStatusIsDead = undefined,
}) => {
  const [pensionaryStatus, setPensionaryStatus] = useState([]);

  // GET DATA
  const {
    data: pensionaryStatusItems,
    isSuccess: pensionaryStatusIsSuccess,
    isLoading: pensionaryStatusIsLoading,
    isFetching: pensionaryStatusIsFetching,
    error: pensionaryStatusError,
  } = useGetPensionaryStatusQuery({
    pensionaryStatusCategory,
    pensionaryStatusIsDead,
  });

  // FETCH DATA
  useEffect(() => {
    if (pensionaryStatusIsSuccess) {
      setPensionaryStatus(pensionaryStatusItems.itemList);
    }
  }, [pensionaryStatusIsSuccess, pensionaryStatusItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (pensionaryStatusError) {
      console.log(pensionaryStatusError);
    }
  }, [pensionaryStatusError]);

  return {
    pensionaryStatus,
    pensionaryStatusIsLoading,
    pensionaryStatusIsFetching,
  };
};

// RELATIONSHIP LOOK UP LOGIC
const useFetchRelationship = () => {
  const [relationships, setRelationships] = useState([]);

  // GET DATA
  const {
    data: relationshipItems,
    isSuccess: relationshipIsSuccess,
    isLoading: relationshipIsLoading,
    isFetching: relationshipIsFetching,
    error: relationshipError,
  } = useGetRelationshipQuery({});

  // FETCH DATA
  useEffect(() => {
    if (relationshipIsSuccess) {
      setRelationships(relationshipItems.itemList);
    }
  }, [relationshipIsSuccess, relationshipItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (relationshipError) {
      console.log(relationshipError);
    }
  }, [relationshipError]);

  return {
    relationships,
    relationshipIsLoading,
    relationshipIsFetching,
  };
};

const useFetchOrganizations = ({ organizationID = undefined }) => {
  const [organizations, setOrganizations] = useState([]);

  // GET DATA
  const {
    data: organizationItems,
    isSuccess: organizationIsSuccess,
    isLoading: organizationIsLoading,
    isFetching: organizationIsFetching,
    error: organizationError,
  } = useGetRetiredOrganizationQuery({ organizationID });

  // FETCH DATA
  useEffect(() => {
    if (organizationIsSuccess) {
      setOrganizations(organizationItems.itemList);
    }
  }, [organizationIsSuccess, organizationItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (organizationError) {
      console.log(organizationError);
    }
  }, [organizationError]);

  return {
    organizations,
    organizationIsLoading,
    organizationIsFetching,
  };
};

// REQUEST TYPE LOOK UP LOGIC
const useFetchRequestType = () => {
  const [requestTypes, setRequestTypes] = useState([]);

  // GET DATA
  const {
    data: requestTypesItems,
    isSuccess: requestTypesIsSuccess,
    isLoading: requestTypesIsLoading,
    isFetching: requestTypesIsFetching,
    error: requestTypesError,
  } = useGetRequestTypeQuery({});

  // FETCH DATA
  useEffect(() => {
    if (requestTypesIsSuccess) {
      setRequestTypes(requestTypesItems.itemList);
    }
  }, [requestTypesIsSuccess, requestTypesItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (requestTypesError) {
      console.log(requestTypesError);
    }
  }, [requestTypesError]);

  return {
    requestTypes,
    requestTypesIsLoading,
    requestTypesIsFetching,
  };
};

export {
  useFetchRetirementStatementTypes,
  useFetchPensionaryStatus,
  useFetchLookUpData,
  useFetchRelationship,
  useFetchOrganizations,
  useFetchRequestType,
};
