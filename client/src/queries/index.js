const GRAPHQL_API = 'http://localhost:4000/graphql';

/**
 *  We're using graphql as a query language and sending it through as a request to the server,
 *  the server is then able to intepret the queries due to the schema and resolvers 
 *  defining the execution of the query on the server side (as demonstrated by Jasmine earlier)
 */

export const GET_ALL_BOOTCAMPERS = function (component) {
  const query = `{
    getAllBootcampers {
      first_name
      last_name
      username
      email
      gender
      campus
      ethnicity
      active
    }
  }`;
  return (fetch(GRAPHQL_API, {
    method: 'POST',
    body: JSON.stringify({
      query
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json()))
};

export const GET_BOOTCAMPERS_BY_GENDER = function (component, gender, campus) {
  let camp_str;
  if (campus === undefined) {
    campus = null;
    camp_str = null;
  } else camp_str = `"${campus}"`;
  const query = `
    query ($gender: String!, $campus: String) {
      getBootcampersByGender(gender: $gender, campus: $campus) {
        first_name
        last_name
        gender
        ethnicity
        campus
      }
    }`;

  const variables = `{  "gender": "${gender}", "campus": ${camp_str}}`;
  fetch(GRAPHQL_API, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      let white_count = 0;
      let black_count = 0;
      let coloured_count = 0;
      let indian_count = 0;
      let chinese_count = 0;
      let dataQL = result.data.getBootcampersByGender;
      for (let elem in dataQL) {
        if (dataQL[elem].ethnicity === 'white') white_count++;
        if (dataQL[elem].ethnicity === 'black') black_count++;
        if (dataQL[elem].ethnicity === 'coloured') coloured_count++;
        if (dataQL[elem].ethnicity === 'indian') indian_count++;
        if (dataQL[elem].ethnicity === 'chinese') chinese_count++;
      }
      if (result.data !== null && result.data !== undefined) {
        if (component.current !== null && component.current !== undefined) {
          component.current.updateDemoCount(
            campus,
            gender,
            white_count,
            black_count,
            coloured_count,
            indian_count,
            chinese_count
          );
          component.current.updateStats(component.current.state.demoCount);
        }
      }
    });
};

export const GET_BOOTCAMPER_DAYS = function (component, username) {
  const query = `
    query ($username: String!){
      getBootcamperDays(username: $username){
        Day
        Username
        User_id
        Campus
        Final_mark
        Mark1
        Comment1
        Mark2
        Comment2
        Mark3
        Comment3
        Cheating
      }
    }
  `;
  const variables = `{  "username": "${username}" }`;
  fetch(GRAPHQL_API, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      if (result.data !== null && result.data !== undefined) {
        if (component !== null && component !== undefined) {
          component.updateStats2(result.data.getBootcamperDays);
        }
      }
    });
};

export const GET_BOOTCAMPER_COLLES = function (component, username) {
  const query = `
    query ($username: String!){
      getBootcamperColles(username: $username){
        Colle
        Username
        User_id
        Campus
        Final_mark
        Mark1
        Comment1
        Cheating
      }
    }
  `;
  const variables = `{  "username": "${username}" }`;
  fetch(GRAPHQL_API, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      if (result.data !== null && result.data !== undefined) {
        if (component.current !== null && component.current !== undefined) {
          component.current.updateStats(result.data.getBootcamperColles);
        }
      }
    });
};

export const GET_BOOTCAMPER_EXAMS = function (component, username) {
  const query = `
    query ($username: String!){
      getBootcamperExams(username: $username){
        Exam
        Username
        User_id
        Campus
        Final_mark
      }
    }
  `;
  const variables = `{  "username": "${username}" }`;
  fetch(GRAPHQL_API, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      if (result.data !== null && result.data !== undefined) {
        if (component.current !== null && component.current !== undefined) {
          component.current.updateStats(result.data.getBootcamperExams);
        }
      }
    });
};

export const GET_ALL_MARKS_FOR_DAY = function (component, day) {
  const query = `
  query ($day: String!) {
    getDay(day:$day) {
      Day
      Username
      User_id
      Campus
      Final_mark
      Mark1
      Comment1
      Mark2
      Comment2
      Mark3
      Comment3
      Cheating
      bootcamper {
        first_name
        last_name
        username
        email
        campus
        gender
        ethnicity
        active
      }
    }
  }
  `;
  const variables = `{  "day": "${day}" }`;
  fetch(GRAPHQL_API, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      if (result.data !== null && result.data !== undefined) {
        if (component.current !== null && component.current !== undefined) {
          component.current.updateStats(result.data.getDay);
        }
      }
    });
};

export const UPDATE_STATUS = function (username, status) {
  const query = `
  mutation ($username: String!, $status: String!) {
    updateStatus(username:$username, status:$status) {
      first_name
      last_name
      username
      email
      campus
      gender
      ethnicity
      active
    }
  }
  `;
  const variables = `{  "username": "${username}", "status": "${status}" }`;
  fetch(GRAPHQL_API, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      console.log("result", result)
    });
};

export const ADD_BOOTCAMPER = function (first_name, last_name, username, email, campus, gender, ethnicity, active) {
  const query = `
  mutation($first_name: String!, $last_name: String!, $username: String!, $email: String!, $campus: String!, $gender: String!, $ethnicity: String!, $active: String!) {
    addBootcamper(first_name: $first_name, last_name: $last_name, username: $username, email: $email, campus: $campus, gender: $gender, ethnicity: $ethnicity, active: $active) {
      first_name
      last_name
      username
      email
      campus
      gender
      ethnicity
      active
    }
  }
  `;
  const variables = `{ "first_name": "${first_name}", "last_name": "${last_name}", "username": "${username}", "email": "${email}", "campus": "${campus}", "gender": "${gender}", "ethnicity": "${ethnicity}", "active": "${active}" }`;
  fetch(GRAPHQL_API, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      console.log("result", result)
    });
};

export const DELETE_BOOTCAMPER = function (username) {
  const query = `
  mutation($username: String!) {
    deleteBootcamper(username: $username) {
      first_name
      last_name
      username
      email
      campus
      gender
      ethnicity
      active
    }
  }
  `;
  const variables = `{ "username": "${username}" }`;
  fetch(GRAPHQL_API, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      console.log("result", result)
    });
};